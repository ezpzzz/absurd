import React from 'react'
import Chart from '../../../components/Chart'

const Page = (): React.JSX.Element => (
  <div>
    <h1>Test</h1>
    <p>Body</p>
    <div>
      <Chart title="Test Chart" data={[1,2,3]} />
    </div>
    <ol>
      <li>Doe, J. (2024). Example. http://example.com</li>
      <li>Doe, J. (2024). Example2. http://example.com/2</li>
    </ol>
  </div>
)

export default Page
