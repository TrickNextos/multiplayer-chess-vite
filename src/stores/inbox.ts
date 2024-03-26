import { defineStore } from 'pinia'

const useInboxStore = defineStore('inbox', {
  state: () => {
    return {
      // friendRequests: [{request_id: 2, username: 'neki'},{request_id: 1, username: 'test'}] as [FriendRequest],
      friendRequests: [] as [FriendRequest],
      messages: [] as [string],
    }
  },
})

interface FriendRequest {
  request_id: number,
  user: UserData,
}

interface UserData {
  username: string,
  id: number,
  country?: string ,
}

export {
  useInboxStore,
  FriendRequest,
}
