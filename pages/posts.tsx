import { Container } from "../components/util/container";
import { Section } from "../components/util/section";
import { Posts, Filters } from "../components/posts";
import { client } from "../.tina/__generated__/client";
import { Layout } from "../components/layout";

export default function HomePage(
  props: AsyncReturnType<typeof getStaticProps>["props"],

) {
  const posts = props.data.postConnection.edges;
  const category:{slug:string;}[]= props.data.postConnection.edges.map((post)=>{
    return { slug: post.node.category.name}
  });
  const uniqueCategory = category.filter((value, index, self)=> 
    index=== self.findIndex((t)=>(
      t.slug === value.slug
    ))
  )
  console.log(uniqueCategory);
  return (
    <Layout>
      <Section className="flex-1">
     {/* <Container size="large" width="large" className="flex flex-wrap justify-center pb-0 pt-4">
          <Filters data={uniqueCategory}/>
        </Container>*/}  
        <Container size="large" width="large" className="flex flex-wrap justify-center">
          <Posts data={posts} />
        </Container>
      </Section>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const tinaProps = await client.queries.pageQuery();
  return {
    props: {
      ...tinaProps,
    },
  };
};

export type AsyncReturnType<T extends (...args: any) => Promise<any>> =
  T extends (...args: any) => Promise<infer R> ? R : any;
