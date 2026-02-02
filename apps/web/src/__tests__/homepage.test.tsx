import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Home from '../app/page'

test('Home renders "Howdy"', () => {
    render(<Home />)
    expect(screen.getByText('Howdy')).toBeDefined()
})