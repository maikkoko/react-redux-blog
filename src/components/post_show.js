import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchPost, deletePost } from '../actions'

class PostShow extends Component {
  componentDidMount() {
    const { id } = this.props.match.params
    this.props.fetchPost(id)
  }

  render() {
    const { post } = this.props

    if (!post) {
      return (
        <div>Loading...</div>
      )
    }

    return (
      <div>
        <Link to="/">Back to Index</Link>
        <button
          onClick={this.onDeleteClick}
          className="btn btn-danger pull-xs-right">
          Delete Post
        </button>
        <h3>{ post.title }</h3>
        <h6>Categories: { post.categories }</h6>
        <p>{ post.content }</p>
      </div>
    )
  }

  onDeleteClick = () => {
    const { id } = this.props.match.params

    this.props.deletePost(id, () => {
      this.props.history.push('/')
    })
  }
}

const mapStateToProps = ({ posts }, ownProps) => (
  { post: posts[ownProps.match.params.id] }
)

export default connect(mapStateToProps,
  { fetchPost, deletePost }
)(PostShow)