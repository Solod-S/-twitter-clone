<template>
  <div class="flex flex-col">
    <!-- Preview Card: What's happening -->
    <SidebarRightPreviewCard title="What's happening">
      <SidebarRightPreviewCardItem
        v-for="whatsHappening in whatsHappeningItems"
        :key="whatsHappening.title"
      >
        <div>
          <h2 class="font-bold text-gray-800 text-md dark:text-white">
            {{ whatsHappening.title }}
          </h2>
          <p class="text-xs text-gray-400">{{ whatsHappening.count }} Tweets</p>
        </div>
      </SidebarRightPreviewCardItem>
    </SidebarRightPreviewCard>
    <!-- Preview Card: Who to follow -->
    <SidebarRightPreviewCard title="Who to follow">
      <SidebarRightPreviewCardItem
        v-for="whoToFollow in whoToFollowItems"
        :key="whoToFollow.name"
      >
        <div class="flex flex-row items-center justify-between p-2">
          <div class="flex flex-row">
            <img
              class="w-10 h-10 rounded-full"
              :src="whoToFollow.image"
              alt="whoToFollow.handle"
            />
            <div class="flex flex-col ml-2">
              <h1 class="text-sm font-bold text-gray-900">
                {{ whoToFollow.name }}
              </h1>
              <p class="text-xs text-gray-400">{{ whoToFollow.handle }}</p>
            </div>
          </div>

          <div class="flex h-full">
            <button
              class="px-4 py-2 font-bold text-xs text-white dark:text-black bg-black dark:bg-white rounded-full"
            >
              Follow
            </button>
          </div>
        </div>
      </SidebarRightPreviewCardItem>
    </SidebarRightPreviewCard>
  </div>
</template>
<script setup>
const whatsHappeningItems = ref([
  {
    title: "ReactIsBetter",
    count: "18.1k",
  },
  {
    title: "#CodingIsFun",
    count: "9.8k",
  },
  {
    title: "JSinBlood",
    count: "22.3k",
  },
]);

const whoToFollowItems = ref([
  {
    name: "Didi",
    handle: "@Didi",
    image: "https://picsum.photos/200/200",
  },
  {
    name: "Alex",
    handle: "@Alex",
    image: "https://picsum.photos/200/220",
  },
  {
    name: "Jane",
    handle: "@Jane",
    image: "https://picsum.photos/200/210",
  },
]);
</script>

// render in PreviewItem
