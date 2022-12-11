import { EGlobalStateName, ISpacePayload, ISpace, IReview, IReviewPayload } from '@/types'

export const useSpaces = defineStore(EGlobalStateName.SPACES, () => {
  const spaces = ref<ISpace[]>([])
  function postSpace (_payload: ISpacePayload): Promise<ISpace> {
    return $fetch<ISpace>(useBaseURL('/spaces'), {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${useAuth().token}`
      },
      body: _payload
    })
  }
  function deleteSpace (_id: string): Promise<boolean> {
    const index = spaces.value.findIndex(_space => _space.id === _id)
    spaces.value.splice(index, 1)
    return $fetch<boolean>(useBaseURL(`/spaces/${_id}`), {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${useAuth().token}`
      }
    })
  }
  async function getSpaces (): Promise<ISpace[]> {
    spaces.value = await $fetch<ISpace[]>(useBaseURL('/spaces'))
    return spaces.value
  }

  function getSpaceByID (_id: string): Promise<ISpace> {
    return $fetch<ISpace>(useBaseURL(`/spaces/${_id}`))
  }

  function isBookmarked (_id: string) {
    return $fetch<boolean>(useBaseURL(`/favorites/me/${_id}/check`), {
      parseResponse: JSON.parse,
      headers: {
        Authorization: `Bearer ${useAuth().token}`
      }
    })
  }

  function addToBookmarks (_id: string) {
    return $fetch<boolean>(useBaseURL(`/favorites/me/${_id}`), {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${useAuth().token}`
      }
    })
  }

  function deleteFromBookmarks (_id: string) {
    return $fetch<boolean>(useBaseURL(`/favorites/me/${_id}`), {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${useAuth().token}`
      }
    })
  }

  function getReviews (_spaceId?: string): Promise<IReview[]> {
    return $fetch<IReview[]>(_spaceId
      ? useBaseURL(`/reviews/${_spaceId}`)
      : useBaseURL('/reviews/my_reviews'), {
      headers: {
        Authorization: `Bearer ${useAuth().token}`
      }
    })
  }

  function postReview (_spaceId: string, _review: IReviewPayload): Promise<boolean> {
    return $fetch<boolean>(useBaseURL(`/reviews/${_spaceId}`), {
      method: 'POST',
      body: _review,
      headers: {
        Authorization: `Bearer ${useAuth().token}`
      }

    })
  }

  function deleteReview (_spaceId: string): Promise<boolean> {
    return $fetch<boolean>(useBaseURL(`/reviews/${_spaceId}`), {
      method: 'delete',
      headers: {
        Authorization: `Bearer ${useAuth().token}`
      }

    })
  }
  return {
    spaces,
    deleteReview,
    deleteSpace,
    deleteFromBookmarks,
    postReview,
    postSpace,
    addToBookmarks,
    getReviews,
    getSpaceByID,
    getSpaces,
    isBookmarked
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSpaces, import.meta.hot))
}
