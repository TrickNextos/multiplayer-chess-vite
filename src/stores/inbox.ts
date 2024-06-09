import { defineStore } from 'pinia'

const useInboxStore = defineStore('inbox', {
  state: () => {
    return {
      // requests: [{request_id: 2, username: 'neki'},{request_id: 1, username: 'test'}] as [FriendRequest],
      requests: [] as [Request],
      messages: [] as [string],
    }
  },
})

interface Request {
  request_id: number,
  user: UserData,
  text: String,
  request_type: String,
  opponent: number,
}

interface UserData {
  username: string,
  id: number,
  country?: string ,
}

export {
  useInboxStore,
  Request,
}
