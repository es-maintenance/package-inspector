import React, { useState, useEffect } from 'react';
import { GithubIcon } from './icons';
import cn from 'classnames';
import NextLink from 'next/link';
import { Row, Col, Spacer, Link, useBodyScroll } from '@nextui-org/react';
import { Container } from '@nextui-org/react';
import { useRouter } from 'next/router';

import { styled } from '@nextui-org/react';

const StyledNavMainContainer = styled('nav', {
  top: 0,
  height: '76px',
  position: 'sticky',
  background: 'transparent',
  zIndex: '$max',
  length: '',
});

const StyledNavContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  size: '100%',
  '& .navbar__social-icon': {
    fill: '$colors$headerIconColor',
  },
  variants: {
    showBlur: {
      true: {
        background: '$headerBackground',
      },
    },
    detached: {
      true: {
        backdropFilter: 'saturate(180%) blur(10px)',
        boxShadow: '0px 5px 20px -5px rgba(2, 1, 1, 0.1)',
      },
      false: {
        backdropFilter: 'none',
        boxShadow: 'none',
        background: 'transparent',
      },
    },
  },
  length: '',
});

export interface Props {
  title: string;
  hasNotify?: boolean;
  isHome?: boolean;
}

const Navbar: React.FC<Props> = ({ isHome, hasNotify, title }) => {
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();
  const [, setBodyHidden] = useBodyScroll(null, { scrollLayer: true });
  const [scrollPosition, setScrollPosition] = useState(
    (typeof window !== 'undefined' && window.pageYOffset) || 0
  );

  const detached = hasNotify ? scrollPosition > 30 : scrollPosition > 0;

  useEffect(() => {
    window.addEventListener('scroll', onScroll.bind(this));
    return () => {
      window.removeEventListener('scroll', onScroll.bind(this));
    };
  }, []);

  const onScroll = () => {
    requestAnimationFrame(() => {
      setScrollPosition(window.pageYOffset);
    });
  };

  useEffect(() => {
    setExpanded(false);
    setBodyHidden(false);
  }, []);

  const onToggleNavigation = () => {
    setExpanded(!expanded);
    setBodyHidden(!expanded);
  };

  const showBlur = !!expanded || !!detached || isHome;

  return (
    <StyledNavMainContainer id="navbar-container">
      {/* Something is messed up where we can't pass types into the component we have defined no the styled component */}
      {/* <StyledNavContainer detached={detached} showBlur={showBlur}> */}
      <StyledNavContainer>
        <Container
          lg={true}
          as="nav"
          display="flex"
          wrap="nowrap"
          alignItems="center"
        >
          <Col
            className="navbar__logo-container"
            css={{
              '@mdMax': {
                width: '100%',
              },
            }}
          >
            <Row justify="flex-start" align="center">
              <NextLink href="/">
                <Link href="/">{title}</Link>
              </NextLink>
            </Row>
          </Col>
          <Col
            className="navbar__resources-container"
            css={{ '@mdMax': { d: 'none' } }}
          >
            <Row justify="center" align="center">
              <Spacer x={1} y={0} />
              <NextLink href="/details">
                <Link
                  className={cn('navbar__link', {
                    active: false,
                  })}
                  href="#"
                  css={{
                    color: '$text',
                    '&.active': {
                      fontWeight: '600',
                      color: '$primary',
                    },
                  }}
                >
                  Report
                </Link>
              </NextLink>
              <Spacer x={1} y={0} />
              <Link
                className="navbar__link"
                target="_blank"
                rel="noopener noreferrer"
                href="#"
                css={{
                  color: '$text',
                }}
              >
                Plugins
              </Link>
            </Row>
          </Col>
          <Col className="navbar__search-container">
            <Row
              className="navbar__search-row"
              justify="flex-end"
              align="center"
              css={{
                position: 'initial',
                '@mdMax': {
                  jc: 'center',
                },
              }}
            >
              <Row
                className="navbar__social-icons-container"
                justify="flex-end"
                align="center"
                gap={1}
                css={{
                  width: 'initial',
                  '@mdMax': {
                    d: 'none',
                  },
                }}
              >
                <Link
                  className="navbar__social-icon"
                  href="https://github.com/nextui-org/nextui"
                  target="_blank"
                  rel="noreferrer"
                  css={{
                    m: '0 6px',
                    '& svg': {
                      transition: '$default',
                    },
                    '&:hover': {
                      '& svg': {
                        opacity: 0.7,
                      },
                    },
                  }}
                >
                  <GithubIcon size={24} />
                </Link>
              </Row>
            </Row>
          </Col>
        </Container>
      </StyledNavContainer>
    </StyledNavMainContainer>
  );
};

export default Navbar;
