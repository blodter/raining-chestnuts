import { AfterViewInit, Component, ComponentRef, ViewContainerRef } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import mapboxgl, { LngLatLike, Popup } from 'mapbox-gl';
import { environment } from '../../../environment/environment';
import { NationalParkService } from '../../core/api/national-park.service';
import { NationalPark } from '../../core/models/national-park.model';
import { QueryResults } from '../../core/models/query-results.model';
import { NationalParkCardComponent } from '../../shared/components/national-park-card/national-park-card.component';
import {
  SubscriptionHandlerComponent
} from '../../shared/components/subscription-handler/subscription-handler.component';

type Popups = {
  [key: string]: mapboxgl.Popup;
};

@Component({
  imports: [
    MatSidenavModule,
    NationalParkCardComponent,
  ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent extends SubscriptionHandlerComponent implements AfterViewInit {
  // Properties
  map?: mapboxgl.Map;
  nationalParks: NationalPark[] = [];
  nationalParksGeoData: GeoJSON.FeatureCollection<GeoJSON.Geometry> = {
    type: 'FeatureCollection',
    features: [],
  };
  openedPopup?: Popup;
  openedPopupId?: number;
  popupRefs: ComponentRef<NationalParkCardComponent>[] = [];
  popups: Popups = {};

  constructor(
    private nationalParkService: NationalParkService,
    private router: Router,
    private viewContainerRef: ViewContainerRef,
  ) {
    super();
    // Get all national parks from backend
    this.nationalParkService.filter({page_size: 'all', ordering: 'name'}).dieWith(this).subscribe({
      next: (response: QueryResults<NationalPark>) => {
        this.nationalParks = response.results;
        this.nationalParksGeoData.features =
          this.nationalParks.map(nationalPark => (
            {
              type: 'Feature',
              id: nationalPark.id,
              geometry: {
                type: 'Point',
                coordinates: [nationalPark.longitude, nationalPark.latitude],
              },
              properties: {
                latitude: nationalPark.latitude,
                longitude: nationalPark.longitude,
                name: nationalPark.name,
                region: nationalPark.region,
                id: nationalPark.id,
              },
            }
          ));
        // Update the source if it exists
        if (this.map && this.map.getSource('national-parks')) {
          const source = this.map.getSource('national-parks') as mapboxgl.GeoJSONSource;
          source.setData(this.nationalParksGeoData);
        }
        this.loadPopups();
      },
    });
  }

  ngAfterViewInit() {
    // Load the map after the view has initialized
    this.map = new mapboxgl.Map({
      accessToken: environment.mapbox.accessToken,
      center: environment.mapbox.defaultCenter,
      container: 'map',
      style: environment.mapbox.style,
      zoom: environment.mapbox.defaultZoom,
    });
    this.onMapLoad();
  }

  generatePopup(
    nationalPark: NationalPark,
    viewContainerRef: ViewContainerRef,
  ): mapboxgl.Popup | undefined {
    // Generate popups from NationalParkCardComponent to be displayed on map when clicking a national park poi
    if (nationalPark.id && nationalPark.latitude && nationalPark.longitude) {
      let popup: mapboxgl.Popup = new mapboxgl.Popup({
        closeOnClick: false,
        maxWidth: 'none',
      }).setLngLat([nationalPark.longitude, nationalPark.latitude]);
      const component = viewContainerRef.createComponent(NationalParkCardComponent);
      this.popupRefs.push(component);
      component.instance.nationalPark = nationalPark
      component.instance.isPopup = true;
      popup.setDOMContent(component.location.nativeElement);
      popup.addClassName(`national-park-${nationalPark.id}`);
      popup.on('close', () => {
        if (this.openedPopup === popup) {
          this.openedPopup = undefined;
          this.openedPopupId = undefined;
        }
      });
      if (this.openedPopupId && this.openedPopupId === nationalPark.id) {
        this.openedPopup = popup;
        if (this.map) {
          this.openedPopup.addTo(this.map);
        }
      }
      return popup;
    }
    return;
  }

  loadPopups() {
    // Load all popups for each national park
    this.nationalParks.forEach((nationalPark: NationalPark) => {
      const popup = this.generatePopup(nationalPark, this.viewContainerRef);
      if (popup && nationalPark.id) {
        this.popups[nationalPark.id] = popup;
      }
    });
  }

  pointClick(e: any) {
    // When clicking a national park, open the popup
    const selectedPopup = this.popups[e.features[0].properties.id];
    if (this.map) {
      if (this.openedPopup) {
        if (selectedPopup !== this.openedPopup) {
          this.openedPopup.remove();
          this.openedPopup = selectedPopup;
          this.openedPopupId = e.features[0].id;
          this.openedPopup.addTo(this.map);
        } else {
          this.openedPopup.remove();
          this.openedPopup = undefined;
          this.openedPopupId = undefined;
        }
      } else {
        this.openedPopup = selectedPopup;
        this.openedPopupId = e.features[0].id;
        this.openedPopup.addTo(this.map);
      }
    }
  }

  seeOnMap(nationalPark?: NationalPark) {
    // Fly to coordinates and open popup
    if (this.map && nationalPark) {
      const nationalParkCoordinates: LngLatLike = [nationalPark.longitude, nationalPark.latitude]
      this.map.flyTo({
        center: nationalParkCoordinates,
        zoom: 12,
      });
      let features = this.map.queryRenderedFeatures(this.map.project(nationalParkCoordinates), {
        layers: ['national-parks-layer'],
        filter: ['==', 'id', nationalPark.id],
      });
      let featureFound = features && features.length == 2;
      if (!featureFound) {
        this.map.flyTo({
          center: nationalParkCoordinates,
          zoom: 12,
        });
      }
      const popup = this.popups[nationalPark.id];
      if (popup && this.openedPopup !== popup) {
        this.openedPopup?.remove();
        this.openedPopup = popup;
        this.openedPopupId = nationalPark.id;
        this.openedPopup.addTo(this.map);
      }
    }
  }

  viewWeather(nationalPark?: NationalPark) {
    // Navigate to weather details
    if (nationalPark) {
      this.router.navigate([`/weather/${nationalPark.id}`]);
    }
  }

  onMapLoad() {
    // Load layers and subscribe to click/hover events on map
    this.map?.on('load', () => {
      if (!this.map?.getSource('national-parks')) {
        this.map?.addSource('national-parks', {
          type: 'geojson',
          data: this.nationalParksGeoData,
        });
        this.map?.addLayer({
          id: 'national-parks-layer',
          type: 'symbol',
          source: 'national-parks',
          layout: {
            'icon-image': 'mapbox-circle',
            'icon-size': 1,
            'icon-allow-overlap': true,
          },
        });
      }
    });

    this.map?.on('click', 'national-parks-layer', (e: any) => this.pointClick(e));

    this.map?.on(
      'mousemove',
      ['national-parks-layer'],
      e => {
        if (e.features && e.features.length > 0) {
          if (this.map) {
            this.map.getCanvas().style.cursor = 'pointer';
          }
        }
      }
    );

    this.map?.on(
      'mouseleave',
      ['national-parks-layer'],
      _ => {
        if (this.map) {
          this.map.getCanvas().style.cursor = '';
        }
      }
    );
  }
}
