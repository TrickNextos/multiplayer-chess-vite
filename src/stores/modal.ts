
import { defineStore } from 'pinia'
import { Ref, VNode } from 'vue'

const useModalStore = defineStore('modal', {
  state: () => {
    return {
      modalState: [] as Array<[ModalNode, Ref<any>]>,
    }
  },

  actions: {
    add_modal(new_modal: ModalNode, result_ref: Ref<any>): Number {
      this.modalState.push([new_modal, result_ref])
      return this.modalState.length
    },
    active(): boolean {
      return this.modalState.length > 0
    },
    remove_modal(id: Number): boolean {
      if (this.modalState.length <= id) {
        return false
      }
      this.modalState.splice(id, this.modalState.length)
    },
    pop_modal(): boolean {
      return this.remove_modal(this.modalState.length-1)
    }
  },

})

interface ModalNode {
  title: string,
  inner: Array<VNode>,
}

export {
  useModalStore,
  ModalNode,
}
