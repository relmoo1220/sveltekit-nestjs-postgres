<script lang="ts">
  import SectionWrapper from "$lib/components/SectionWrapper.svelte";
  import Button from "$lib/components/ui/button/button.svelte";
  import Input from "$lib/components/ui/input/input.svelte";
  import Label from "$lib/components/ui/label/label.svelte";
  import Pagination from "$lib/components/ui/pagination/pagination.svelte";
  import * as Table from "$lib/components/ui/table/index.js";
</script>

<div class="h-screen w-full bg-slate-950">
  <SectionWrapper>
    <h1 class="font-bold font-mono text-white text-2xl">
      📋 CSV Uploader Web Application 📋
    </h1>
    <p class="font-mono text-gray-400">
      This project is to showcase a full stack development
    </p>
  </SectionWrapper>
  <SectionWrapper>
    <div class="mt-5">
      <Label class="font-bold text-gray-400 mt-10 mb-2" for="csvFile"
        >CSV File</Label
      >
      <Input type="file" id="csvFile" class="w-[250px]" />
    </div>
    <Button class="mt-2">Upload</Button>
  </SectionWrapper>
  <SectionWrapper>
    <Input type="text" placeholder="Search" class="max-w-xs m-10" />
  </SectionWrapper>
  <SectionWrapper>
    <Table.Root>
      <Table.Caption>A list of posts.</Table.Caption>
      <Table.Header>
        <Table.Row>
          <Table.Head class="w-[100px]">id</Table.Head>
          <Table.Head>postId</Table.Head>
          <Table.Head>name</Table.Head>
          <Table.Head>email</Table.Head>
          <Table.Head class="text-right">body</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body></Table.Body>
    </Table.Root>
  </SectionWrapper>
  <SectionWrapper></SectionWrapper>
</div>
