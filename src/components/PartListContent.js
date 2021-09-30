import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'

import DropdownTreeSelect from 'react-dropdown-tree-select'
import 'react-dropdown-tree-select/dist/styles.css'
import './dropdown-tree-select.css'

const testData = {
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

const SQ_SERVER = 'http://center.irnok.net:3020/sparql'
// const SQ_SERVER = 'http://localhost:3020/sparql'

const SQ = `PREFIX dbr: <http://dbpedia.org/resource/>
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
select * where {
  ?class rdfs:subClassOf dbr:Electronic_component .
  bind(replace(strafter(str(?class),str(dbr:)),'_',' ') as ?class_name) .
  OPTIONAL {
    SERVICE <http://dbpedia.org/sparql> {
      ?class rdfs:label ?title .
      FILTER (
        langMatches(lang(?title), 'ru')
      )
    }
  }
} limit 100`

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
  const [data, setData] = useState([])

  useEffect(() => {
    const q = 'query=' + encodeURIComponent(SQ)
    // const q = 'query=select * where { ?s ?p ?o } limit 2'
    const p = fetch(SQ_SERVER, {
      method: 'POST',
      body: q,
      headers: {
        Accept: 'application/sparql-results+json,*/*;q=0.9',
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
    })
    console.log(q)
    p.then((resp) => resp.json())
      .then((answer) => {
        console.log(JSON.stringify(answer, null, 1))
        return answer['results']['bindings']
      })
      .then((bindings) => {
        return bindings.map((item) => {
          return {
            value: item.class.value,
            label: item.title === undefined ? item.class_name.value : item.title.value,
            expanded: true,
          }
        })
      })
      .then((tree) => {
        const data = {
          value: '<http://dbpedia.org/resource/Electronic_component>',
          label: 'Компоненты',
          expanded: true,
          children: tree,
        }
        setData(data)
      })
  }, [])

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
