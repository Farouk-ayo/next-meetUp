import Head from "next/head";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";
import { Fragment } from "react";

// const DUMMY_MEETUPS = [
//   {
//     id: "m1",
//     title: "A First Meetup",
//     Image: "images",
//     address: "SOme addresses",
//     description: "first meetup",
//   },
//   {
//     id: "m2",
//     title: "A second Meetup",
//     Image: "images",
//     address: "SOme addresses",
//     description: "second meetup",
//   },
// ];

function Homepage(props) {
  return (
    <Fragment>
      <Head>
        <title>meetups next</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;
//   //fetch data from api

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export async function getStaticProps() {
  //fetc data from an API
  const client = await MongoClient.connect(
    "mongodb+srv://Faroukayo:Faroukayo@cluster0.2tlgmgj.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    // must always return an object
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
        description: meetup.description,
      })),
    },
    revalidate: 1,
  };
}

export default Homepage;
