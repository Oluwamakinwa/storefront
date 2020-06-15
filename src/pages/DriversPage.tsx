import { IAppState } from '../store/app';
import { Typography } from '@material-ui/core';
import { useContent } from '../store/cms';
import { useIsSmall } from '../common/hooks';
import { useSelector } from 'react-redux';
import BaseLayout from '../layouts/BaseLayout';
import Loading from '../components/Loading';
import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './DriversPage.module.scss';

const DriversPage: React.FC = () => {
  const isSmall = useIsSmall();
  const driverFormId = useSelector<IAppState, string>((state) => state.cms.config.driverFormId);
  const pageTitle = useContent('drive_page_title');
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <BaseLayout padding={pageTitle ? undefined : 0} title={pageTitle} maxWidth={pageTitle ? undefined : 'unset'}>
      <div className={classNames(styles.container, { [styles.small]: isSmall, [styles.loading]: loading })}>
        <script src="https://static.airtable.com/js/embed/embed_snippet_v1.js"></script>
        {driverFormId && (
          <iframe
            onLoad={() => setLoading(false)}
            title="Driver Application"
            className="airtable-embed airtable-dynamic-height"
            src={`https://airtable.com/embed/${driverFormId}?backgroundColor=white&layout=card`}
            frameBorder="0"
            width="100%"
            height={pageTitle ? 800 : isSmall ? 2400 : 2280}
            style={{ backgroundColor: 'hsl(0,0%,98%)' }}
          />
        )}
        {!driverFormId && <Typography variant="body1">Driver Form ID not configured</Typography>}
        <div className={styles.brandCover} />
      </div>
      {loading && <Loading />}
    </BaseLayout>
  );
};

export default DriversPage;
