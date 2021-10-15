import { Box } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React from 'react';
import Footer from './footer';
import Header from './header';

interface Props {
    children: React.ReactNode;
}

const Layout = ({ children }: Props): JSX.Element => {
    return (
        <Box pos="relative" minHeight="100vh" data-testid="layout">
            <Header />
            <Box px={['5%', '10%']} pb={['600px', '400px', null, null, '280px']}>
                {children}
            </Box>
            <Footer />
        </Box>
    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;
