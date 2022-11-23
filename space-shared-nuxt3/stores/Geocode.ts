import { IGeocodePayload } from './../types/general.types'
import { EGlobalStateName, ILocation, TNullableField } from '@/types'

export const useGeocode = defineStore(EGlobalStateName.GEOCODE, () => {
  const config = useRuntimeConfig().public.geoConfig
  const lastSearch = ref<TNullableField<ILocation>>(null)

  function joinAddress (_address: IGeocodePayload): string {
    return [
      _address.country || '',
      _address.city || '',
      _address.street || '',
      _address.house || ''
    ].filter(Boolean).join(', ')
  }

  async function getGeodata (_address: IGeocodePayload): Promise<TNullableField<ILocation>> {
    const data = await $fetch<any>(config.GEOCODE_API, {
      params: { searchtext: joinAddress(_address), apiKey: config.API_KEY }
    })

    if (data.Response.View?.length > 0) {
      const location = data.Response.View[0].Result?.[0].Location
      const {
        MapView: {
          TopLeft: { Latitude: TLLatitude, Longitude: TLLongitude },
          BottomRight: { Latitude: BRLatitude, Longitude: BRLongitude }
        },
        DisplayPosition: {
          Latitude,
          Longitude
        }
      } = location
      const { Country } = location.Address
      const out = {
        lat: String(Latitude),
        lon: String(Longitude),
        mapView: {
          TopLeft: { lon: String(TLLongitude), lat: String(TLLatitude) },
          BottomRight: { lon: String(BRLongitude), lat: String(BRLatitude) }
        },

        countryCode: Country,
        country: _address.country,
        city: _address.city,
        street: _address.street,
        house: _address.house,

        label: location.Address.Label
      }
      lastSearch.value = out
      console.log({ out })

      return out
    } else {
      lastSearch.value = null
      return null
    }
  }

  return {
    lastSearch,

    getGeodata,
    joinAddress
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGeneral, import.meta.hot))
}
