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
import { useIntersectionObserver } from 'usehooks-ts'
import { queryClient } from '@/queryClient'
// import { getChildTransactionsFor, withIsChild } from '@/utils'

const stickBottomAlign = {
  position: 'sticky',
  alignSelf: 'flex-end',
  bottom: 0,
}
export default function HomePage() {
  const infiniteLoaderDivRef = React.useRef()
  const [infiniteLoading, setInfiniteLoading] = React.useState(false)
  const [hasNextPage, setHasNextPage] = React.useState(true)
  const entry = useIntersectionObserver(infiniteLoaderDivRef, {})

  const [page, setPage] = React.useState(1)
  const [sortBy, setSortBy] = React.useState('all')

  const postList = useQuery(
    ['transaction', sortBy],
    () =>
      api.transactions.all(
        new URLSearchParams({ key_param: sortBy, page: page, pagination: 1, page_size: 5 })
      ),
    {
      refetchOnWindowFocus: false,
    }
  )
  const [stickyStyles, setStickyStyles] = React.useState({})
  const rightSidebarRef = React.useRef()

  let allPosts = postList.data || []
  const parentPosts = allPosts

  React.useEffect(() => {
    function handleResize() {
      if (!rightSidebarRef.current) {
        return
      }

      const rightSidebar = rightSidebarRef.current
      const height = rightSidebar.getBoundingClientRect().height
      if (height > window.innerHeight) {
        setStickyStyles(stickBottomAlign)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  React.useEffect(() => {
    if (entry?.isIntersecting === true && infiniteLoading === false) {
      setInfiniteLoading(true)
      api.transactions
        .all(
          new URLSearchParams({ key_param: sortBy, page: page + 1, pagination: 1, page_size: 5 })
        )
        .then((data) => {
          if (Array.isArray(data)) {
            console.log(data)
            queryClient.setQueryData(['transaction', sortBy], (prev) => {
              console.log(prev)
              return [
                // ...prev,
                // ...data,
                ...prev,
                ...data,
              ]
            })
            setPage(page + 1)
          }
        })
        .catch((e) => {
          if (e.isAxiosError === true && e.response.data.detail === "Invalid page.") {
            setHasNextPage(false)
          }
          return console.log(e)
        })
        .finally(() => {
          setInfiniteLoading(false)
        })
    }
  }, [entry?.isIntersecting])

  return (
    <>
      {/* main posts */}
      <div className="pl-3 pr-3 xs:pt-0 lg:py-3 lg:pl-0 xxl:pt-3">
        <div>
          <ImageSlider />
        </div>
        <div className="xrelative z-20 mt-3">
          <NewPost sortBy={sortBy} />
        </div>

        <div className="mt-1">
          <SortBy value={sortBy} onChange={sortOption => {
            setPage(1)
            setHasNextPage(true)
            setSortBy(sortOption)
          }} />
        </div>

        <div className="relative mt-1" id="post-list">
          {parentPosts.length == 0 ? (
            <div className="h-64 rounded-md  bg-gray-300" />
          ) : (
            parentPosts
              .slice(0, 2)
              .map((post, i) => <PostCard i={i} key={post.id} post={post} sortBy={sortBy} />)
          )}
        </div>
        <div className="mt-1">
          <AchievementBanner />
        </div>
        <div className="relative mt-1">
          {parentPosts.length == 0 ? (
            <div className="h-64 rounded-md  bg-gray-300" />
          ) : (
            parentPosts
              .slice(2)
              .map((post, index) => <PostCard key={index} post={post} sortBy={sortBy} />)
          )}

          {hasNextPage === false ? (
            <p className="flex h-32 items-center justify-center">You have reached the end🥳</p>
          ) : (
            <div className="h-64 animate-pulse rounded-md bg-gray-300" ref={infiniteLoaderDivRef} />
          )}
        </div>
      </div>

      {/* right sidebar */}
      <div
        ref={rightSidebarRef}
        style={stickyStyles}
        className="flex w-full flex-col gap-3 overflow-y-auto pb-5 pl-3 pr-3 pt-3 md:w-[260px] md:pl-[0px] lg:w-[235px] lg:pr-0 xl:w-[319px]"
      >
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
