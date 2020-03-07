/*
 * Small microservice to generate a Discord-like chat section
 * Copyright (C) 2020 Bowser65
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import Component from './Component'

export default {
  createElement (element, attributes = {}, children = null) {
    if (!attributes) attributes = {}

    if (typeof element === 'string') {
      const node = document.createElement(element)
      for (const attr in attributes) {
        // noinspection JSUnfilteredForInLoop
        node.setAttribute(attr, attributes[attr])
      }
      if (Array.isArray(children)) {
        for (const child of children) {
          if (child instanceof Node) {
            // noinspection JSUnfilteredForInLoop
            node.appendChild(child)
          } else if (typeof child === 'string') {
            // noinspection JSUnfilteredForInLoop
            node.appendChild(document.createTextNode(child))
          }
        }
      } else if (children instanceof Node) {
        node.appendChild(children)
      } else if (typeof children === 'string') {
        node.appendChild(document.createTextNode(children))
      }
      return node
    }
    if (element.prototype instanceof Component) {
      // eslint-disable-next-line new-cap
      const instance = new element(attributes, children)
      return instance.render()
    }
    throw new Error('Failed to create component. You may only pass a string or a Component.')
  },

  mount (element) {
    if (!(element instanceof HTMLElement)) {
      throw new Error('Cannot mount something that isn\'t a HTMLElement!')
    }
    document.querySelector('.render-engine').innerHTML = ''
    document.querySelector('.render-engine').appendChild(element)
  }
}
