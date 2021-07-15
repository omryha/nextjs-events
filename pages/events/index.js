import { Fragment } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import EventsList from '../../components/events/events-list';
import EventsSearch from '../../components/events/events-search';
import { getAllEvents } from '../../helpers/api-util';

const AllEventsPage = (props) => {
  const router = useRouter();
  const { events } = props;

  const findEventsHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  };

  return (
    <Fragment>
      <Head>
        <title>All Events</title>
        <meta
          name='description'
          content='Find great events for you'
          key='description'
        />
      </Head>
      <EventsSearch onSearch={findEventsHandler} />
      <EventsList items={events} />
    </Fragment>
  );
};

export async function getStaticProps() {
  const events = await getAllEvents();

  return {
    props: {
      events: events,
    },
    revalidate: 60,
  };
}

export default AllEventsPage;
