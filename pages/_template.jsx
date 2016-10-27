import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import { config } from 'config'
import { Menu, Container, Label, Segment, Grid } from 'semantic-ui-react'

import '../css/style.scss'

import ContractDropdown from '../components/contractDropdown'

export default class Index extends Component {
  render() {
    // const activeItem = prefixLink(child.path) === this.props.location.pathname
    const onIndex = prefixLink('/') === this.props.location.pathname
    const docsRoute = this.props.route.childRoutes.find(route => route.path === '/docs/')
    const docsPath = docsRoute.childRoutes[0].path
    // TODO active page
    // TODO dynamic github link
    return (
      <div style={{ paddingTop: '60px' }} className="pusher">
        <Menu inverted fixed="top">
          <Container>
            <Menu.Item header as={Link} to={prefixLink('/')}>
              {config.name}
              <Label color="grey">{config.version}</Label>
            </Menu.Item>
            <Menu.Item className="mobile hidden">{config.description}</Menu.Item>
            <Menu.Menu position="right">
              {/* TODO render currently selected documentaiton item with dropdown */}
              {onIndex ?
                <Menu.Item as={Link} to={prefixLink(docsPath)}>Contracts</Menu.Item>
              :
                <ContractDropdown pages={docsRoute.childRoutes} location={this.props.location} />
              }
              {config.homepage &&
                <Menu.Item as={'a'} target="_blank" href={config.homepage}>
                   Github
                </Menu.Item>
              }
            </Menu.Menu>
          </Container>
        </Menu>
        <Container>
          {this.props.children}
        </Container>
        <Container className="footer">
          <Segment secondary size="small" attached="top" compact>
            <Grid stackable>
              <Grid.Row>
                <Grid.Column width={6}>
                  <b>&copy; {config.author}</b> - {config.license}, {new Date(config.buildTime).getFullYear()}
                </Grid.Column>
                <Grid.Column width={10} textAlign="right">
                  Built using <b>Solidity {config.compiler}</b> on <b>{new Date(config.buildTime).toLocaleDateString()}</b>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </Container>
      </div>
    )
  }
}
Index.propTypes = {
  children: PropTypes.object,
  location: PropTypes.object,
  route: PropTypes.object,
}
