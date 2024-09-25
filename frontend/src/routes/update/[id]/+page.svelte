<script lang="ts">
  import SectionWrapper from "$lib/components/SectionWrapper.svelte";
  import Input from "$lib/components/ui/input/input.svelte";
  import Label from "$lib/components/ui/label/label.svelte";
  import Button from "$lib/components/ui/button/button.svelte";
  import Textarea from "$lib/components/ui/textarea/textarea.svelte";

  const apiBaseUrl = import.meta.env.VITE_API_URL;

  export let data;
  const { post } = data;

  async function handleSubmit() {
    // Prepare JSON payload
    const payload = {
      postId: post.postId,
      name: post.name,
      email: post.email,
      body: post.body,
    };

    // Perform form submission logic, like calling an API
    try {
      const response = await fetch(`${apiBaseUrl}/upload/update/${post.id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        console.log("Successful update entry. Status: ", response.status);
        window.location.href = "/";
      } else {
        console.error("Failed to update entry. Status: ", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
</script>

<div class="h-screen w-full bg-slate-950">
  <SectionWrapper>
    <h2 class="text-2xl font-bold mb-6 text-gray-400">Update</h2>

    <form on:submit|preventDefault={handleSubmit} class="w-[800px]">
      <!-- Post ID -->
      <div class="mb-4">
        <Label class="text-gray-400 font-bold">Post ID</Label>
        <Input type="number" id="postId" bind:value={post.postId} required />
      </div>

      <!-- Name -->
      <div class="mb-4">
        <Label class="text-gray-400 font-bold">Name</Label>
        <Input type="text" id="name" bind:value={post.name} required />
      </div>

      <!-- Email -->
      <div class="mb-4">
        <Label class="text-gray-400 font-bold">Email</Label>
        <Input type="email" id="email" bind:value={post.email} required />
      </div>

      <!-- Body -->
      <div class="mb-6">
        <Label class="text-gray-400 font-bold">Body</Label>
        <Textarea id="body" bind:value={post.body} required></Textarea>
      </div>

      <!-- Submit Button -->
      <div class="flex justify-end">
        <Button on:click={handleSubmit}>Submit</Button>
      </div>
    </form>
  </SectionWrapper>
</div>