import {useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	selectTab,
	setTab
} from '@store/slices/tabs.slice'

const useTabBar = () => {
	const dispatch = useDispatch()

	const currentTab = useSelector(selectTab)

	const setCurrentTab = (name) => {
		dispatch(setTab(name));
	}

	return useMemo(
		() => ({
			currentTab,
			setCurrentTab,
		}),
		[currentTab, setCurrentTab]
	)
}

export default useTabBar
