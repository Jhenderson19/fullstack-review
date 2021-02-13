import React from 'react';
import RepoListElement from './RepoListElement.jsx';

const RepoList = function(props) {
  var rows = [];

  props.repos.map((repo) => {
    rows.push(<RepoListElement repo={repo} key={rows.length}/>);
  });

  return (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    <table>
      <tbody>
        <tr>
          <td><h4>Owner</h4></td>
          <td><h4>Name</h4></td>
          <td><h4>Size</h4></td>
          <td><h4>Watchers</h4></td>
        </tr>
        {rows}
      </tbody>
    </table>
  </div>
  )
}

export default RepoList;