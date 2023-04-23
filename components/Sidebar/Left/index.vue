<template>
  <div class="h-screen flex flex-col">
    <div
      class="p-2 my-2 rounded-full hover:bg-blue-50 w-min dark:hover:bg-white/20"
      :class="defaultTransition"
    >
      <nuxt-link to="/">
        <div class="w-8 h-8"><LogoTwitter /></div>
      </nuxt-link>
    </div>

    <div class="mt-2 space-y-3 mb-5">
      <SidebarLeftTab active :class="defaultTransition">
        <template v-slot:icon>
          <HomeIcon />
        </template>
        <template v-slot:name> Home </template>
      </SidebarLeftTab>
      <SidebarLeftTab :class="defaultTransition">
        <template v-slot:icon>
          <HashtagIcon />
        </template>
        <template v-slot:name> Explore </template>
      </SidebarLeftTab>

      <SidebarLeftTab :class="defaultTransition">
        <template v-slot:icon>
          <BellIcon />
        </template>
        <template v-slot:name> Notification </template>
      </SidebarLeftTab>
      <SidebarLeftTab :class="defaultTransition">
        <template v-slot:icon>
          <InboxIcon />
        </template>
        <template v-slot:name> Messages </template>
      </SidebarLeftTab>
      <SidebarLeftTab :class="defaultTransition">
        <template v-slot:icon>
          <BookmarkIcon />
        </template>
        <template v-slot:name> Bookmarks </template>
      </SidebarLeftTab>
      <SidebarLeftTab :class="defaultTransition">
        <template v-slot:icon>
          <DocumentTextIcon />
        </template>
        <template v-slot:name> Lists </template>
      </SidebarLeftTab>
      <SidebarLeftTab :class="defaultTransition">
        <template v-slot:icon>
          <UserIcon />
        </template>
        <template v-slot:name> Profile </template>
      </SidebarLeftTab>
      <SidebarLeftTab :class="defaultTransition">
        <template v-slot:icon>
          <EllipsisHorizontalCircleIcon />
        </template>
        <template v-slot:name> More </template>
      </SidebarLeftTab>
    </div>
    <div class="hidden xl:block">
      <UIButton liquid size="lg"><span class="font-bold">Tweet</span></UIButton>
    </div>
    <div class="block xl:hidden">
      <UIButton>
        <div class="w-6 h-6 font-bold"><PencilIcon /></div>
      </UIButton>
    </div>
  </div>
</template>

<script setup>
import { HomeIcon } from "@heroicons/vue/24/solid";
import {
  HashtagIcon,
  InboxIcon,
  BellIcon,
  BookmarkIcon,
  DocumentTextIcon,
  UserIcon,
  EllipsisHorizontalCircleIcon,
  PencilIcon,
} from "@heroicons/vue/24/outline";
// const transition = "transition ease-in-out duration-1";
const { defaultTransition } = useTailwindConfig();
</script>
