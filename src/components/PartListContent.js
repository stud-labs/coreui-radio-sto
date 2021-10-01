import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'

import DropdownTreeSelect from 'react-dropdown-tree-select'
import 'react-dropdown-tree-select/dist/styles.css'
import './dropdown-tree-select.css'

import { ElectronicComponent } from '../resource/electric'

const SQ_SERVER = 'http://center.irnok.net:3020/sparql'
// const SQ_SERVER = 'http://localhost:3020/sparql'

const sparqlQuery = (rootResource) => {
  const SQ = `PREFIX dbr: <http://dbpedia.org/resource/>
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
select * where {
  ?class rdfs:subClassOf ${rootResource} .
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
  return SQ
}

const loadTree = (parentNode) => {
  const q = 'query=' + encodeURIComponent(sparqlQuery(parentNode.value))
  const p = fetch(SQ_SERVER, {
    method: 'POST',
    body: q,
    headers: {
      Accept: 'application/sparql-results+json,*/*;q=0.9',
      'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
  })
  console.log(q)
  const r = p
    .then((resp) => resp.json())
    .then((answer) => {
      return answer['results']['bindings']
    })
    .then((bindings) => {
      return bindings.map((item) => {
        const node = {
          value: item.class.value,
          label: item.title === undefined ? item.class_name.value : item.title.value,
          expanded: true,
        }
        return node
      })
    })
    .then((nodes) => {
      return { ...parentNode, children: nodes }
    })
    .then((tree) => {
      console.log(JSON.stringify(tree))
      return tree
    })
  return r
}

// ------- Stuff for the component ------

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
    const rootNode = {
      value: ElectronicComponent,
      label: 'Компоненты',
      expanded: true,
    }
    loadTree(rootNode).then((data) => setData(data))
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
