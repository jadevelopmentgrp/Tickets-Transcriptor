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

class ThemeSwitch extends HTMLElement {
  constructor () {
    super()
    this.toggle = this.toggle.bind(this)
  }

  connectedCallback () {
    this.addEventListener('click', this.toggle)
  }

  toggle () {
    const theme = document.body.className
    if (theme === 'theme-dark') {
      document.body.className = 'theme-light'
    } else {
      document.body.className = 'theme-dark'
    }
  }
}

customElements.define('theme-switch', ThemeSwitch)
