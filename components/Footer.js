import { config } from 'config'
import { prefixLink } from 'gatsby-helpers'
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'


class Footer extends Component {

  render() {
    let homeLink
    if ( this.props.location.pathname !== '/' ) {
      homeLink = (
        <li className="inlineBlock mr-2">
          <Link to={prefixLink('/')}>Home</Link>
        </li>
      )
    }

    return (
      <footer className="footer flexItem-none py-3 bgDarker-1">
        <div className="maxW-4 mx-auto px-2 px-4@sm flex@sm flex-wrap">
          <nav id="nav" className="mr-auto@sm" role="navigation">
            <ul className="listReset lineHeight-44 mb-0 flex@sm flex-wrap items-center">
              { homeLink }
              <li className="inlineBlock mr-2">
                <Link to={prefixLink('/work/')}>Work</Link>
              </li>
              <li className="inlineBlock mr-2">
                <Link to={prefixLink('/writing/')}>Writing</Link>
              </li>
              <li className="inlineBlock mr-2">
                <Link to={prefixLink('/resume/')}>Résumé</Link>
              </li>
              <li className="inlineBlock">
                <Link to={prefixLink('/colophon/')}>Colophon</Link>
              </li>
            </ul>
          </nav>
          <ul className="listReset lineHeight-44 mb-0 flex@sm flex-wrap items-center">
            <li className="inlineBlock mr-2">
              <a href={'mailto:' + config.email}>Email</a>
            </li>
            <li className="inlineBlock mr-2">
              <a href={'https://linkedin.com/in/' + config.linkedin} target="_blank">Linkedin</a>
            </li>
            <li className="inlineBlock">
              <a href={'https://github.com/' + config.github} target="_blank">GitHub</a>
            </li>
          </ul>
        </div>
      </footer>
    )
  }

}

export default Footer
