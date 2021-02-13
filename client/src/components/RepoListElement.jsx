import React from 'react';

const RepoListElement = (props) => (
  <tr>
    <td>{props.repo.owner}</td>
    <td><a href={props.repo.html_url}>{props.repo.name}</a></td>
    <td>{props.repo.size}</td>
    <td>{props.repo.watchers}</td>
  </tr>
)

export default RepoListElement;