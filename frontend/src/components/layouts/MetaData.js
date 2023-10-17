import React from "react";

import { Helmet } from "react-helmet-async";

const MetaData = ({ title }) => {
  return (
    <Helmet>
      <title>{`${title}-KKcart`}</title>
    </Helmet>
  );
};

MetaData.propTypes = {};

export default MetaData;
