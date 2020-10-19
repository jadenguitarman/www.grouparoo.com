import Head from "next/head";
import { Container, Row, Col, Breadcrumb } from "react-bootstrap";
import hydrate from "next-mdx-remote/hydrate";
import {
  TableOfContents,
  capitalize,
} from "../../../components/docs/tableOfContents";
import HavingProblems from "../../../components/docs/havingProblems";
import DocImage from "../../../components/docs/image";
import {
  loadEntries,
  loadMdxFile,
  getStaticMdxPaths,
} from "../../../utils/mdxUtils";

const components = { HavingProblems, Image: DocImage };

export default function DocPage({ pageProps }) {
  const { source, frontMatter, docs } = pageProps;
  const content = hydrate(source, { components });

  return (
    <>
      <Head>
        <title>Grouparoo Docs: {frontMatter.title}</title>
        <meta name="description" content={frontMatter.pullQuote} />
        <link
          rel="canonical"
          href={`http://www.grouparoo.com${frontMatter.path}`}
        />
      </Head>

      <Container>
        {frontMatter.path !== "/docs/index" ? (
          <Breadcrumb>
            {frontMatter.path
              .split("/")
              .splice(1)
              .map((part, idx) => (
                <Breadcrumb.Item
                  key={`breadcrumb-${idx}`}
                  href={`${frontMatter.path
                    .split("/")
                    .filter((_p, i) => i <= idx + 1)
                    .join("/")}`}
                >
                  {capitalize(part)}
                </Breadcrumb.Item>
              ))}
          </Breadcrumb>
        ) : null}
        <Row>
          <Col className="d-none d-md-block">
            <TableOfContents docs={docs} />
          </Col>

          <Col
            xl={9}
            lg={9}
            md={8}
            sm={12}
            xs={12}
            className="documentationPage"
          >
            <h1>{frontMatter.title}</h1>
            <small>
              <em>Last Updated: {frontMatter.date}</em>
            </small>
            <hr />
            <div>{content}</div>
          </Col>

          <Col className="d-md-none">
            <TableOfContents docs={docs} />
          </Col>
        </Row>
      </Container>
      <br />
      <br />
    </>
  );
}

export async function getStaticProps({ params }) {
  const dirParts = ["docs"];
  if (params.page) {
    dirParts.push(params.section);
    dirParts.push(`${params.page}.mdx`);
  } else {
    dirParts.push(`${params.section}.mdx`);
  }

  const { source, frontMatter } = await loadMdxFile(dirParts, components);
  const docs = await loadEntries(["docs"]);

  return { props: { source, frontMatter, docs } };
}

export async function getStaticPaths(depth = 1) {
  return getStaticMdxPaths(["docs"], depth);
}