import { Fragment } from "react";
import { Row, Col, Container, Card, Alert, Button } from "react-bootstrap";
import {
  getJob,
  getJobs,
  LeverJob,
  LeverJobListItem,
} from "../../utils/jobPosts";
import Head from "next/head";
import Link from "next/link";
import WorkingAtGrouparooCard from "../../components/jobs/workingAtGrouparoo";

export default function JobPage({ pageProps }) {
  const job: LeverJob = pageProps.job;

  if (!job) {
    return (
      <Container>
        <Alert variant="warning">This job cannot be found</Alert>
      </Container>
    );
  }

  return (
    <>
      <Head>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@grouparoo" />
        <meta name="twitter:creator" content={"@grouparoo"} />
        <meta
          property="og:url"
          content={`https://www.grouparoo.com/jobs/${job.id}`}
        />
        <meta property="og:title" content={`${job.text}`} />
        <meta
          property="og:description"
          content={`Join our 100% remote team to build the best open-source data sync apps.`}
        />
        <meta
          property="og:image"
          content="https://www.grouparoo.com/_next/image?url=%2Fimages%2Fhome%2Ftwitter-og-image.png&w=1920&q=75"
        />
        <meta
          name="twitter:image"
          content="https://www.grouparoo.com/_next/image?url=%2Fimages%2Fhome%2Ftwitter-og-image.png&w=1920&q=75"
        />
      </Head>

      <Container>
        <h1>Join Grouparoo</h1>
        <Row>
          <Col md={8}>
            <JobCard job={job} />
          </Col>
          <Col>
            <div
              style={{
                position: "sticky",
                top: 10,
              }}
            >
              <WorkingAtGrouparooCard />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

function JobCard({ job }: { job: LeverJob }) {
  return (
    <Card>
      <Card.Body>
        <Card.Title>
          {job.text} <small> - Remote, USA</small>
        </Card.Title>

        <Button
          size="sm"
          variant="outline-primary"
          href={job.applyUrl}
          target="_blank"
        >
          Apply Now
        </Button>

        <hr />

        <div
          id="job-description"
          dangerouslySetInnerHTML={{ __html: job.description }}
        />

        <br />

        {job.lists.map((listItem) => (
          <Fragment key={`job-${job.id}-list-${listItem.text}`}>
            <JobListItem listItem={listItem} />
            <br />
          </Fragment>
        ))}

        <Button variant="primary" href={job.applyUrl} target="_blank">
          Apply Now - {job.text}
        </Button>
        <br />
        <br />
        <Link href="/jobs">
          <a>See all open Positions</a>
        </Link>
      </Card.Body>
    </Card>
  );
}

function JobListItem({ listItem }: { listItem: LeverJobListItem }) {
  return (
    <Card>
      <Card.Header>
        <strong>{listItem.text}</strong>
      </Card.Header>
      <Card.Body dangerouslySetInnerHTML={{ __html: listItem.content }} />
    </Card>
  );
}

JobPage.getInitialProps = async function (ctx) {
  const job = await getJob(ctx.query.id);
  return { job };
};
