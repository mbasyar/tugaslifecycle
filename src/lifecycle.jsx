import React, { Component } from "react";
import { Form, Button, Container, Card, Row, Col } from "react-bootstrap";

class Newsapi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      isLoading: true,
      error: null,
      searchTerm: "",
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    this.fetchData("Popular");
  }

  fetchData(searchTerm) {
    fetch(
      `https://gnews.io/api/v4/search?q=${searchTerm}&lang=en&country=us&max=10&apikey=de6c315e52d7534595e6734df65e360c`
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("erorr masseh... :[");
        }
      })
      .then((data) => {
        this.setState({
          articles: data.articles,
          isLoading: false,
        });
      })
      .catch((error) => this.setState({ error, isLoading: false }));
  }

  handleSearch(event) {
    event.preventDefault();
    const searchTerm = this.state.searchTerm;
    this.fetchData(searchTerm);
  }

  render() {
    const { isLoading, articles, error, searchTerm } = this.state;
    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading) {
      return <p>wait what now...?</p>;
    }

    return (
      <>
        <Container
          style={{
            width: "400px",
            margin: "10px auto 0",
            padding: "10px",
          }}
        >
          <Form className="d-flex" onSubmit={this.handleSearch}>
            <Form.Control
              className="me-2"
              type="text"
              aria-label="Search"
              placeholder="Search"
              value={searchTerm}
              onChange={(event) =>
                this.setState({ searchTerm: event.target.value })
              }
            ></Form.Control>
            <Button type="submit" variant="btn btn-primary">
              Search
            </Button>
          </Form>
        </Container>
        <Row>
          {articles.map((article) => (
            <Col className="md-4 ">
              <Card style={{ width: "28rem" }} key={article.title}>
                <Card.Img variant="top" src={article.image} style={{ width: "25rem" }} />
                <Card.Body>
                  <Card.Title><h1>{article.title}</h1></Card.Title>
                  <Card.Text> <h3>{article.description}</h3></Card.Text>
                  <a href={article.url}><Button>Show Detail</Button></a>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </>
    );
  }
}

export default Newsapi;