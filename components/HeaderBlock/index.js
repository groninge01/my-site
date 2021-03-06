import camelCase from 'lodash/camelCase'
import React, { Component, PropTypes } from 'react'

import './styles.css'


class HeaderBlock extends Component {

  render () {
    const { title, children } = this.props

    // Inserting a <br /> between each word in the header’s title
    const titleArray = title.split(' ')
    const gap = (<span><br /></span>)
    let formattedTitle = [], word, i = 0

    for ( i; i < titleArray.length; i++ ) {
      //gap = (<span key={1000+i}><br className="display-none@xs display-none@sm-md"/><span className="display-none@md">&nbsp;</span></span>)
      word = (<span key={i}>{titleArray[i]}</span>)
      if ( i < titleArray.length - 1 ) {
        formattedTitle.push(word, gap)
        console.log(i, word, gap)
      } else {
        formattedTitle.push(word)
      }
    }

    return (
      <header className={'cf mb-4 relative sectionBlock--' + camelCase(title)} role="banner">
        <div className="left@md w-33@md px-2 px-3@sm pl-1@md pr-3@md">
          <h1 className="h1 caps lineHeight-3 mb-1">{formattedTitle}</h1>
          <p className="fs-5 italic">[ &#712;ste-fɑn vɑn &#712;&#611;ro-n&#618;-&#331;εn ]</p>
        </div>
        <div className="right@md w-66@md mt-3 mt-0@md px-2 px-3@sm pr-0@md">
          {children}
        </div>
      </header>
    )
  }

}

HeaderBlock.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.any
}

export default HeaderBlock
