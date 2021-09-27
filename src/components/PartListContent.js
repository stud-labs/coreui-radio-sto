import PropTypes from 'prop-types'
import React from 'react'

import DropdownTreeSelect from 'react-dropdown-tree-select'
import 'react-dropdown-tree-select/dist/styles.css'
import './dropdown-tree-select.css'

const data = {
  label: 'search me',
  value: 'searchme',
  expanded: true,
  children: [
    {
      label: 'Do not search me',
      value: 'searchmetoo',
      children: [
        {
          label: 'ne555',
          value: '555',
        },
      ],
    },
    {
      label: 'search me too',
      value: 'searchmetoo',
      expanded: true,
      children: [
        {
          label: 'ne555',
          value: '555',
        },
      ],
    },
    {
      label: 'Sad Elephant',
      value: 'sedel',
    },
  ],
}

const onChange = (currentNode, selectedNodes) => {
  console.log('onChange::', currentNode, selectedNodes)
}

const onAction = (node, action) => {
  console.log('onAction::', action, node)
}

const onNodeToggle = (currentNode) => {
  console.log('onNodeToggle::', currentNode)
}

const PartListContent = (props) => {
  // const { title } = props
  return (
    <DropdownTreeSelect
      data={data}
      onChange={onChange}
      onAction={onAction}
      onNodeToggle={onNodeToggle}
      showDropdown="always"
      texts={{ placeholder: 'Part type search' }}
    />
  )
}

PartListContent.propTypes = {
  title: PropTypes.string,
}

export default PartListContent
