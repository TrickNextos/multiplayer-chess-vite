import { defineStore } from 'pinia'
import { VNode, h } from 'vue'

const useNotificationStore = defineStore('notification', {
  state: () => {
    return {
      notificationState: {} as Record<number, VNode>,
    }
  },

  actions: {
    add_notification(new_modal: VNode, time_ms: number): Number {
      let id = Math.floor(Math.random() * 10_000 ) // get random number between 0 and 10_000
      this.notificationState[id] = new_modal
      if (time_ms != 0) {
        setTimeout(() => {
          this.remove_notification(id)
        }, time_ms)
      }
      console.log()
      return id
    },
    active(): boolean {
      return this.notificationState.length > 0
    },
    remove_notification(id: number) {
      delete this.notificationState[id]
    },
    success(text: string) {
      this.add_notification(h('div', {style: 'border-color: var(--color-green);border-width: 2px;'}, text), 2000)
    }
  },

})

export {
  useNotificationStore,
}
