import { render, screen } from '@testing-library/react'
import { Badge } from '../Badge'

describe('Badge', () => {
  it('renders children', () => {
    render(<Badge>Vegetariano</Badge>)
    expect(screen.getByText('Vegetariano')).toBeInTheDocument()
  })

  it('applies success variant by default', () => {
    render(<Badge variant="success">OK</Badge>)
    const badge = screen.getByText('OK')
    expect(badge.className).toContain('success')
  })

  it('applies warning variant', () => {
    render(<Badge variant="warning">Aviso</Badge>)
    expect(screen.getByText('Aviso').className).toContain('warning')
  })

  it('applies accent variant', () => {
    render(<Badge variant="accent">Destaque</Badge>)
    expect(screen.getByText('Destaque').className).toContain('accent')
  })

  it('applies filter variant', () => {
    render(<Badge variant="filter">Todos</Badge>)
    expect(screen.getByText('Todos').className).toContain('filter')
  })

  it('marks filter badge as active', () => {
    render(<Badge variant="filter" active>Pratos</Badge>)
    expect(screen.getByText('Pratos').className).toContain('active')
  })

  it('passes additional className', () => {
    render(<Badge className="extra">X</Badge>)
    expect(screen.getByText('X').className).toContain('extra')
  })
})
