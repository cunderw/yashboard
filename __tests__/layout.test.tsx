import { render, screen } from '@testing-library/react'
import Layout from '../components/Layout'
import '@testing-library/jest-dom'

describe('Layout', () => {
  it('renders an appbar', () => {
    let isEditMode = false
    const openAppModal = jest.fn(() => (isEditMode = true))
    const enableEditMode = jest.fn(() => (isEditMode = true))
    const disableEditMode = jest.fn(() => (isEditMode = false))
    render(
      <Layout
        openAddAppModal={openAppModal}
        isEditMode={isEditMode}
        enableEditMode={enableEditMode}
        disableEditMode={disableEditMode}
      >
        <div />
      </Layout>,
    )

    const heading = screen.getByTestId('app-bar')

    expect(heading).toBeInTheDocument()
  })
})
