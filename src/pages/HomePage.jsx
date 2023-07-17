import * as React from 'react'

import Top5UserWidget from '../components/HomeRightSidebar/Top5UserWidget'
import RecentCampaignWidget from '../components/HomeRightSidebar/RecentCampaignWidget'
import SurveyOngoingWidget from '../components/HomeRightSidebar/SurveyOngoingWidget'
import RecommendationWidget from '../components/HomeRightSidebar/RecommendationWidget'
import CelebrationWidget from '../components/HomeRightSidebar/CelebrationWidget'
import NewPost from '../components/NewPost'
import { RedeemPointsWidget } from '../components/HomeRightSidebar/RedeemPointsWidget'

import PostCard from '../components/PostCard'
import SortBy from '../components/SortBy'
import ImageSlider from '../components/ImageSlider'
import { useSelector } from 'react-redux'
import { AchievementBanner } from '../components/AchievementBanner'
import GifPicker from '@/components/GifPickerPopover'
import { useQuery } from 'react-query'
import { api } from '@/api'

const getChildTransactionsFor = (parentId, allTransactions) => {
  return allTransactions.filter((post) => post.parent_id == parentId)
}

const withIsChild = (allTransactions) => {
  return allTransactions.map((post) => {
    const hasParent = allTransactions.some((parentPost) => post.parent_id == parentPost.id)
    // if a transaction has a parent transaction then its a child transaction
    post.isChild = hasParent

    return post
  })
}

export default function HomePage() {
  const postList = useQuery('transactions', () => api.transactions.all())

  let allPosts = postList.isLoading ? [] : postList.data
  allPosts = withIsChild(allPosts)
  const parentPosts = allPosts.filter(
    (post) => !post.isChild || getChildTransactionsFor(post.id, allPosts).length > 0
  )

  return (
    <>
      {/* main posts */}
      <div className="pl-3 pr-3 xs:pt-0 lg:py-3 lg:pl-0 xxl:pt-3">
        <div>
          <ImageSlider />
        </div>
        <div className="xrelative z-20 mt-3">
          <NewPost />
        </div>
        <div className="mt-1">
          <SortBy />
        </div>

        <div className="relative mt-1" id="post-list">
          {postList.isLoading ? (
            <div className="h-64 rounded-md  bg-gray-300" />
          ) : (
            parentPosts
              .slice(0, 2)
              .map((post, i) => (
                <PostCard
                  i={i}
                  key={post.id}
                  post={post}
                  childrenTransactions={getChildTransactionsFor(post.id, allPosts)}
                />
              ))
          )}
        </div>
        <div className="mt-1">
          <AchievementBanner />
        </div>
        <div className="relative mt-1">
          {postList.isLoading ? (
            <div className="h-64 rounded-md  bg-gray-300" />
          ) : (
            parentPosts
              .slice(2)
              .map((post, index) => (
                <PostCard
                  key={index}
                  post={post}
                  childrenTransactions={getChildTransactionsFor(post.id, allPosts)}
                />
              ))
          )}
        </div>
      </div>

      {/* right sidebar */}
      <div className="bottom-0 flex w-full flex-col gap-3 self-end overflow-y-auto pb-5 pl-3 pr-3 pt-3 md:sticky md:w-[260px] md:pl-[0px] lg:w-[235px] lg:pr-0 xl:w-[319px]">
        <RedeemPointsWidget />
        <RecommendationWidget />
        <CelebrationWidget />
        <Top5UserWidget />
        <SurveyOngoingWidget />
        <RecentCampaignWidget />
      </div>
    </>
  )
}
