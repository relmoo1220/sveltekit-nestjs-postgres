<script lang="ts">
  import { goto } from "$app/navigation";
  import SectionWrapper from "$lib/components/SectionWrapper.svelte";
  import Button from "$lib/components/ui/button/button.svelte";
  import Input from "$lib/components/ui/input/input.svelte";
  import Label from "$lib/components/ui/label/label.svelte";
  import Pagination from "$lib/components/ui/pagination/pagination.svelte";
  import * as Table from "$lib/components/ui/table/index.js";

  const apiBaseUrl = import.meta.env.VITE_API_URL;

  // SSR data
  export let data;
  const uploads = data.entries;

  // headers variable to store the keys of the first object in the items array
  let headers: string[] = [];

  // items variable to contain the objects in the jsonData
  let items: any[] = uploads;

  // Extract headers from the first object of uploads
  if (uploads.length > 0) {
    headers = Object.keys(uploads[0]); // Get keys of the first object
  }

  // To contain the csv file
  let fileInput: File | null = null;

  // Function to handle file change
  function handleFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      fileInput = target.files[0]; // Get the first file selected
    }
  }

  // Function for the upload button when user uploads the CSV file
  async function uploadFile() {
    if (fileInput) {
      const formData = new FormData();
      formData.append("file", fileInput);

      try {
        const response = await fetch(`${apiBaseUrl}/upload/csv`, {
          method: "POST",
          body: formData,
        });

        console.log(`${apiBaseUrl}/upload/csv`);

        if (response.ok) {
          console.log("Successful upload. Status: ", response.status);
          // Clear the file input
          fileInput = null;
          // Refetch the data after a successful upload
          await fetchItems(); // Fetch and update items with new data
        } else {
          console.error("Failed to upload file. Status: ", response.status);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      console.error("No file selected.");
    }
  }

  // Function to fetch all items
  async function fetchItems() {
    try {
      const response = await fetch(`${apiBaseUrl}/upload/get-all`);
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }
      const data = await response.json();
      items = data;
      console.log("Data fetched:", data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  }

  // Function to remove the specific row
  async function removeItem(id: number) {
    try {
      const response = await fetch(
        `${apiBaseUrl}/upload/delete/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Re-fetch list of items after a successful delete of the entry
        fetchItems();
        console.log("Entry deleted successfully. Status: ", response.status);
      } else {
        console.error("Failed to delete entry. Status: ", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  // Function to handle the selection of a specific entry
  async function handleSelectEntry(id: number) {
    // Navigate to the update page for the selected entry
    goto(`/update/${id}`);
  }
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
      <Input
        type="file"
        on:change={handleFileChange}
        id="csvFile"
        class="w-[250px]"
      />
    </div>
    <Button class="mt-2" on:click={uploadFile}>Upload</Button>
  </SectionWrapper>
  <SectionWrapper>
    <Input type="text" placeholder="Search" class="max-w-xs m-10" />
  </SectionWrapper>
  <SectionWrapper>
    <Table.Root>
      <Table.Caption>A list of uploaded data.</Table.Caption>
      <Table.Header>
        <Table.Row>
          {#each headers as header}
            <Table.Head>{header}</Table.Head>
          {/each}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {#each items as item}
          <Table.Row>
            <Table.Cell class="text-gray-400">{item.id}</Table.Cell>
            <Table.Cell class="text-gray-400">{item.postId}</Table.Cell>
            <Table.Cell class="text-gray-400">{item.name}</Table.Cell>
            <Table.Cell class="text-gray-400">{item.email}</Table.Cell>
            <Table.Cell class="text-gray-400">{item.body}</Table.Cell>
            <Table.Cell>
              <Button on:click={() => handleSelectEntry(item.id)}>Select</Button>
            </Table.Cell>
            <Table.Cell>
              <Button on:click={() => removeItem(item.id)}>Remove</Button>
            </Table.Cell>
          </Table.Row>
        {/each}
      </Table.Body>
    </Table.Root>
  </SectionWrapper>
</div>
