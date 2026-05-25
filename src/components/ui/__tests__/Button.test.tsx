import { render, screen } from '@testing-library/react'
import { Button } from '../Button'

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toHaveTextContent('Click me')
  })

  it('applies primary variant classes by default', () => {
    render(<Button>Primary</Button>)
    const btn = screen.getByRole('button')
    expect(btn.className).toContain('bg-accent-terra')
  })

  it('applies secondary variant classes', () => {
    render(<Button variant="secondary">Secondary</Button>)
    const btn = screen.getByRole('button')
    expect(btn.className).toContain('border')
  })

  it('applies ghost variant classes', () => {
    render(<Button variant="ghost">Ghost</Button>)
    const btn = screen.getByRole('button')
    expect(btn.className).toContain('ghost')
  })

  it('passes additional className', () => {
    render(<Button className="extra-class">Btn</Button>)
    expect(screen.getByRole('button').className).toContain('extra-class')
  })

  it('forwards HTML button props', () => {
    render(<Button disabled>Disabled</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('renders as anchor when asChild href is passed via tag override', () => {
    render(<Button as="a" href="/test">Link</Button>)
    expect(screen.getByRole('link')).toBeInTheDocument()
  })
})
