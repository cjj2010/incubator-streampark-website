import React from 'react'
import useIsBrowser from '@docusaurus/useIsBrowser'
import config from './languages.json'

export default function (props) {
  const tableData = props.dataSource || []
  const isBrowser = useIsBrowser();
  const language = isBrowser && location.pathname.indexOf('/zh-CN/') === 0 ? 'zh-CN' : 'en'
  const dataSource = config?.[language];

  function getSourceLink(version, suffix) {
    return 'https://www.apache.org/dyn/closer.lua/incubator/streampark/'
        .concat(version)
        .concat('/apache-streampark-')
        .concat(version)
        .concat('-incubating-src.tar.gz')
        .concat(suffix)
  }

  function getBinaryLink(scala, version, suffix) {
    return 'https://www.apache.org/dyn/closer.lua/incubator/streampark/'
        .concat(version)
        .concat('/apache-streampark_')
        .concat(scala)
        .concat('-')
        .concat(version)
        .concat('-incubating-bin.tar.gz')
        .concat(suffix)
  }

  return (
      <table className="table-ui mb-4">
        <thead>
        <tr>
          <th className='text-center'> {dataSource.table.version} </th>
          <th className='text-center'>{dataSource.table.date} </th>
          <th className='text-center'> {dataSource.table.source}</th>
          <th className='text-center'> {dataSource.table.binary} </th>
          <th className='text-center'> {dataSource.table.releaseNotes} </th>
        </tr>
        </thead>
        <tbody>
        {
          tableData.map((release) => {
            return <tr key={release.version} style={{fontSize: '13px'}}>
              <td className='text-center'> {release.version} </td>
              <td className='text-center'> {release.date} </td>
              <td className='text-center'>
                <a href={getSourceLink(release.version, '')} target="_blank">source</a>
                <span> ( </span>
                <a href={getSourceLink(release.version, '.sha512')} target="_blank">sha512</a>
                <span> | </span>
                <a href={getSourceLink(release.version, '.asc')} target="_blank">signature</a>
                <span> ) </span>
              </td>
              <td className='text-center'>
                <a href={getBinaryLink('2.12', release.version, '')} target="_blank">
                  {'apache-streampark_2.12-' + release.version + '-incubating-bin.tar.gz'}
                </a>
                <span> ( </span>
                <a href={getBinaryLink('2.12', release.version, '.asc')} target="_blank">
                  Sign
                </a>
                <span> | </span>
                <a href={getBinaryLink('2.12', release.version, '.sha512')} target="_blank">
                  SHA512
                </a>
                <span> ) </span>
                <br/>
                <a href={getBinaryLink('2.11', release.version, '')} target="_blank">
                  {'apache-streampark_2.11-' + release.version + '-incubating-bin.tar.gz'}
                </a>
                <span> ( </span>
                <a href={getBinaryLink('2.11', release.version, '.asc')} target="_blank">
                  Sign
                </a>
                <span> | </span>
                <a href={getBinaryLink('2.11', release.version, '.sha512')} target="_blank">
                  SHA512
                </a>
                <span> ) </span>
              </td>
              <td className='text-center'>
                <a href={'https://streampark.apache.org/download/release-note/'.concat(release.version)} target="_blank">
                  {dataSource.releaseNotes}
                </a>
              </td>
            </tr>
          })
        }
        </tbody>
      </table>
  );
}
