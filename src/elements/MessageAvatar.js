/*
 * Copyright (c) 2020 Cynthia K. Rey
 * Licensed under the Open Software License version 3.0
 */

import { lateDefine, createUserPopout } from '../utils'

class MessageAvatar extends HTMLImageElement {
  constructor () {
    super()
    this.onError = this.onError.bind(this)
  }

  connectedCallback () {
    this.addEventListener('error', this.onError)
    const contents = this.nextElementSibling.nextElementSibling
    createUserPopout(this, {
      id: this.parentElement.dataset.author,
      username: contents.querySelector('.name').textContent,
      avatar: this.src,
      badge: contents.querySelector('.badge').textContent
    })
  }

  onError () {
    this.removeEventListener('error', this.onError)
    this.src = `https://cdn.discordapp.com/embed/avatars/${this.dataset.author.id % 6}.png`
  }
}

lateDefine('message-avatar', MessageAvatar, { extends: 'img' })
