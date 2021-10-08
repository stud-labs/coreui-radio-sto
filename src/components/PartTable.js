import React from 'react'
import { PropTypes, Any } from 'prop-types'
import { useState, useEffect } from 'react'
import 'datatables.net-dt'
import 'datatables.net-dt/js/dataTables.dataTables'
import 'datatables.net-dt/css/jquery.dataTables.css'
// import 'datatables.net-dt/css/jquery.dataTables.min.css'
var DataTable = require('datatables.net')

const partStableID = 'parts_table'

// react table component did not work in this context

class PartTable extends React.Component {
  constructor(props) {
    super(props)
    const columns = [
      {
        name: 'Название',
        selector: (row) => row.title,
      },
      {
        name: 'Год',
        selector: (row) => row.year,
      },
    ]

    const data = [
      {
        id: 1,
        title: 'Star trek',
        year: 2009,
      },
      {
        id: 2,
        title: 'Star wars',
        year: 1999,
      },
      {
        id: 3,
        title: 'Star wars',
        year: 1999,
      },
      {
        id: 4,
        title: 'Star wars',
        year: 1999,
      },
      {
        id: 5,
        title: 'Star wars',
        year: 1999,
      },
      {
        id: 6,
        title: 'Star wars',
        year: 1999,
      },
      {
        id: 7,
        title: 'Star wars',
        year: 1999,
      },
      {
        id: 8,
        title: 'Star wars',
        year: 1999,
      },
      {
        id: 9,
        title: 'Star wars',
        year: 1999,
      },
      {
        id: 10,
        title: 'Star wars',
        year: 1999,
      },
      {
        id: 11,
        title: 'Star wars',
        year: 1999,
      },
      {
        id: 12,
        title: 'Star wars',
        year: 1999,
      },
      {
        id: 13,
        title: 'Star wars',
        year: 1999,
      },
      {
        id: 14,
        title: 'Star wars',
        year: 1999,
      },
      {
        id: 15,
        title: 'Star wars',
        year: 1999,
      },
    ]
    this.p = { data: data, columns: columns }
  }

  componentDidMount(props) {
    this.props = props
    this.table = new DataTable('#' + partStableID, {
      paging: false,
      scrollY: 400,
      searchPanes: {
        viewTotal: true,
      },
      language: {
        emptyTable: 'Нет никаких данных',
        zeroRecords: 'Фильтру не соответствует ни одна строка',
        decimal: '.',
        info: 'Строки с _START_ по _END_, всего: _TOTAL_,',
        infoEmpty: 'Всего 0 строк (с 0-й по 0-ю),',
        infoFiltered: ' отфильтрованы из _MAX_ строк',
        infoPostFix: '',
        thousands: ' ',
        lengthMenu: 'Показано строк _MENU_',
        loadingRecords: 'Грузим...',
        processing: 'Обрабатываем...',
        search: 'Поиск:',
        paginate: {
          first: 'В начало',
          last: 'В конец',
          next: 'Следующая страница',
          previous: 'Предыдущая страница',
        },
        aria: {
          sortAscending: ': activate to sort column ascending',
          sortDescending: ': activate to sort column descending',
        },

        searchPanes: {
          title: {
            _: 'Выбрано %d фильтров',
            0: 'Фильтра не выбраны',
            1: 'Выбран один фильтр',
            2: 'Выбрано два фильтра',
            3: 'Выбрано три фильтра',
            4: 'Выбрано четыре фильтра',
          },

          count: ' найдено {total}',
          countFiltered: '{shown} всего: {total}',
        },
      },

      // options
    })
    // $('#'+partStableID)
  }

  render() {
    const a = [0]
    for (var i = 0; i < 100; i++) a[i] = i
    const columns = this.p.colums
    const data = this.p.data
    // console.log(columns, data)
    return (
      <div>
        <table id={partStableID} className="display">
          <thead>
            <tr>
              {this.p.columns.map((c, i) => (
                <th key={i}>{c.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {this.p.data.map((d, i) => (
              <tr key={d.id}>
                {this.p.columns.map((c, j) => (
                  <td key={j * 1000 + d.id}>{c.selector(d)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

const propTypes = {
  data: Any,
  colums: Any,
}

const defaultProps = {}

PartTable.propTypes = propTypes
PartTable.defaultProps = defaultProps

export default PartTable
