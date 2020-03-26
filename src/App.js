import React from 'react';
import './App.css';
import axios from 'axios';

function Posts(props) {
  return props.posts.map(post => (
    <p id={post.id} key={post.id} onClick={props.onClick}>
      {post.title}
    </p>
  ));
}
class App extends React.Component {
  state = {
    posts: [],
    loading: true,
    error: null
  };

  async componentDidMount() {
    try {
      const data = await axios({
        method: 'GET',
        baseURL: 'http://jsonplaceholder.typicode.com/',
        url: '/posts',
        params: {
          _page: 1,
          _limit: 25
        }
      });
      this.setState({
        posts: data.data
      });
    } catch (error) {
      this.setState({ error: 'Something went wrong' });
    } finally {
      this.setState({ loading: false });
    }
  }

  clickPost = event => {
    const idPost = event.target.id;
    console.log();
    const post = this.state.posts.filter(
      post => post.id === parseInt(idPost)
    )[0];
    console.log(post);
  };

  render() {
    if (this.state.error) return <h1>Loading...</h1>;
    if (this.state.loading === true) {
      return <h1>Loading...</h1>;
    } else {
      return (
        <div className="App">
          <h1>Blog</h1>
          <Posts onClick={this.clickPost} posts={this.state.posts} />
        </div>
      );
    }
  }
}

export default App;
