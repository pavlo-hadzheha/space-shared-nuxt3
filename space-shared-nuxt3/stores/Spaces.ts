import { EGlobalStateName, ISpacePayload, ISpace, IReview, IReviewPayload } from '@/types'

export const useSpaces = defineStore(EGlobalStateName.SPACES, {
  state: () => {
    return {
      spaces: [] as ISpace[]
    }
  },
  actions: {
    postSpace (_payload: ISpacePayload): Promise<ISpace> {
      return $fetch<ISpace>(useBaseURL('/spaces'), {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${useAuth().token}`
        },
        body: _payload
      })
    },
    deleteSpace (_id: string): Promise<boolean> {
      const index = this.spaces.findIndex(_space => _space.id === _id)
      this.spaces.splice(index, 1)
      return $fetch<boolean>(useBaseURL(`/spaces/${_id}`), {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${useAuth().token}`
        }
      })
    },
    async getSpaces (): Promise<ISpace[]> {
      this.spaces = await $fetch<ISpace[]>(useBaseURL('/spaces'))
      return this.spaces
    },

    getSpaceByID (_id: string): Promise<ISpace> {
      return $fetch<ISpace>(useBaseURL(`/spaces/${_id}`))
    },

    isBookmarked (_id: string) {
      return $fetch<boolean>(useBaseURL(`/favorites/me/${_id}/check`), {
        parseResponse: JSON.parse,
        headers: {
          Authorization: `Bearer ${useAuth().token}`
        }
      })
    },

    addToBookmarks (_id: string) {
      return $fetch<boolean>(useBaseURL(`/favorites/me/${_id}`), {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${useAuth().token}`
        }
      })
    },

    deleteFromBookmarks (_id: string) {
      return $fetch<boolean>(useBaseURL(`/favorites/me/${_id}`), {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${useAuth().token}`
        }
      })
    },

    getReviews (_spaceId?: string): Promise<IReview[]> {
      return $fetch<IReview[]>(_spaceId
        ? useBaseURL(`/reviews/${_spaceId}`)
        : useBaseURL('/reviews/my_reviews'), {
        headers: {
          Authorization: `Bearer ${useAuth().token}`
        }
      })
    },

    postReview (_spaceId: string, _review: IReviewPayload): Promise<boolean> {
      return $fetch<boolean>(useBaseURL(`/reviews/${_spaceId}`), {
        method: 'POST',
        body: _review,
        headers: {
          Authorization: `Bearer ${useAuth().token}`
        }

      })
    },

    deleteReview (_spaceId: string): Promise<boolean> {
      return $fetch<boolean>(useBaseURL(`/reviews/${_spaceId}`), {
        method: 'delete',
        headers: {
          Authorization: `Bearer ${useAuth().token}`
        }

      })
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSpaces, import.meta.hot))
}
