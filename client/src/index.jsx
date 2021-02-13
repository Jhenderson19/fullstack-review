import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }
  }

  search (term) {
    console.log(`${term} was searched`);
    // TODO
    $.ajax('/repos', {
      data: {user: term},
      method: "POST",
      success: () => {
        this.grabRepos();
      },
      error: (e) => {
        console.warn('error making post request', e);
      },
      complete: () => {
        console.log('post request resolved');
      },
      timeout: 5000
    })
  }

  grabRepos() {
    $.ajax('/repos', {
      method: "GET",
      success: (repoData) => {
        this.setState({
          repos: repoData
        });
      },
      error: (e) => {
        console.warn('error making /repos get request', e);
      }
    });
  }

  componentDidMount() {
    this.grabRepos();
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));