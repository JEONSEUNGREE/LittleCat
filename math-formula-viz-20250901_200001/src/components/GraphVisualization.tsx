import React, { useMemo, useCallback, useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'
import { ZoomIn, ZoomOut, RotateCcw, Move, Maximize2 } from 'lucide-react'
import useFormulaStore from '../store/useFormulaStore'
import * as math from 'mathjs'

const GraphVisualization: React.FC = () => {
  const { formulas, graphRange, updateGraphRange } = useFormulaStore()
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [showGrid, setShowGrid] = useState(true)
  const [showAxes, setShowAxes] = useState(true)

  const graphData = useMemo(() => {
    const points = 200
    const step = (graphRange.xMax - graphRange.xMin) / points
    const data = []

    for (let i = 0; i <= points; i++) {
      const x = graphRange.xMin + i * step
      const point: any = { x: Number(x.toFixed(4)) }

      formulas.forEach((formula) => {
        if (formula.visible) {
          try {
            const expression = formula.expression.toLowerCase()
            const compiled = math.compile(expression)
            const y = compiled.evaluate({ x })
            
            if (isFinite(y) && !isNaN(y)) {
              point[formula.id] = Number(y.toFixed(4))
            }
          } catch (error) {
            console.error(`Error evaluating formula ${formula.id}:`, error)
          }
        }
      })

      data.push(point)
    }

    return data
  }, [formulas, graphRange])

  const handleZoomIn = useCallback(() => {
    const xCenter = (graphRange.xMin + graphRange.xMax) / 2
    const yCenter = (graphRange.yMin + graphRange.yMax) / 2
    const xRange = (graphRange.xMax - graphRange.xMin) * 0.8
    const yRange = (graphRange.yMax - graphRange.yMin) * 0.8

    updateGraphRange({
      xMin: xCenter - xRange / 2,
      xMax: xCenter + xRange / 2,
      yMin: yCenter - yRange / 2,
      yMax: yCenter + yRange / 2
    })
  }, [graphRange, updateGraphRange])

  const handleZoomOut = useCallback(() => {
    const xCenter = (graphRange.xMin + graphRange.xMax) / 2
    const yCenter = (graphRange.yMin + graphRange.yMax) / 2
    const xRange = (graphRange.xMax - graphRange.xMin) * 1.25
    const yRange = (graphRange.yMax - graphRange.yMin) * 1.25

    updateGraphRange({
      xMin: xCenter - xRange / 2,
      xMax: xCenter + xRange / 2,
      yMin: yCenter - yRange / 2,
      yMax: yCenter + yRange / 2
    })
  }, [graphRange, updateGraphRange])

  const handleReset = useCallback(() => {
    updateGraphRange({
      xMin: -10,
      xMax: 10,
      yMin: -10,
      yMax: 10
    })
  }, [updateGraphRange])

  const handleFitToScreen = useCallback(() => {
    if (graphData.length === 0) return

    let minY = Infinity
    let maxY = -Infinity

    graphData.forEach(point => {
      formulas.forEach(formula => {
        if (formula.visible && point[formula.id] !== undefined) {
          minY = Math.min(minY, point[formula.id])
          maxY = Math.max(maxY, point[formula.id])
        }
      })
    })

    if (minY !== Infinity && maxY !== -Infinity) {
      const padding = (maxY - minY) * 0.1
      updateGraphRange({
        yMin: minY - padding,
        yMax: maxY + padding
      })
    }
  }, [graphData, formulas, updateGraphRange])

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 rounded-lg shadow-lg border border-gray-200">
          <p className="text-sm font-semibold text-gray-700">
            x = {payload[0].payload.x}
          </p>
          {payload.map((entry: any) => {
            const formula = formulas.find(f => f.id === entry.dataKey)
            if (formula) {
              return (
                <p key={entry.dataKey} className="text-sm" style={{ color: entry.color }}>
                  {formula.name}: {entry.value?.toFixed(3)}
                </p>
              )
            }
            return null
          })}
        </div>
      )
    }
    return null
  }

  const visibleFormulas = formulas.filter(f => f.visible)

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 animate-slide-in">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg md:text-xl font-bold text-gray-800">그래프</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setShowGrid(!showGrid)}
            className={`p-2 rounded-lg transition-smooth ${
              showGrid 
                ? 'bg-primary-100 text-primary-600' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            title="격자 표시"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M4 6h16M4 12h16M4 18h16M6 4v16M12 4v16M18 4v16" />
            </svg>
          </button>
          <button
            onClick={() => setShowAxes(!showAxes)}
            className={`p-2 rounded-lg transition-smooth ${
              showAxes 
                ? 'bg-primary-100 text-primary-600' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            title="축 표시"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M3 12h18m0 0l-4-4m4 4l-4 4M12 3v18m0 0l-4-4m4 4l4-4" />
            </svg>
          </button>
          <button
            onClick={handleZoomIn}
            className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-smooth"
            title="확대"
          >
            <ZoomIn className="w-5 h-5" />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-smooth"
            title="축소"
          >
            <ZoomOut className="w-5 h-5" />
          </button>
          <button
            onClick={handleFitToScreen}
            className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-smooth"
            title="화면에 맞추기"
          >
            <Maximize2 className="w-5 h-5" />
          </button>
          <button
            onClick={handleReset}
            className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-smooth"
            title="초기화"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="h-[400px] md:h-[500px] -mx-2 md:mx-0">
        {visibleFormulas.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart 
              data={graphData}
              margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
            >
              {showGrid && (
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              )}
              <XAxis 
                dataKey="x"
                domain={[graphRange.xMin, graphRange.xMax]}
                type="number"
                stroke="#6b7280"
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => value.toFixed(0)}
              />
              <YAxis
                domain={[graphRange.yMin, graphRange.yMax]}
                type="number"
                stroke="#6b7280"
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => value.toFixed(0)}
              />
              <Tooltip content={<CustomTooltip />} />
              
              {showAxes && (
                <>
                  <ReferenceLine x={0} stroke="#374151" strokeWidth={1.5} />
                  <ReferenceLine y={0} stroke="#374151" strokeWidth={1.5} />
                </>
              )}
              
              {visibleFormulas.map((formula) => (
                <Line
                  key={formula.id}
                  type="monotone"
                  dataKey={formula.id}
                  stroke={formula.color}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4 }}
                  connectNulls={false}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            <div className="text-center">
              <Move className="w-12 h-12 mx-auto mb-3 text-gray-400" />
              <p>표시할 그래프가 없습니다</p>
              <p className="text-sm mt-1">수식을 추가하고 표시를 활성화하세요</p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-gray-600">
        <div className="bg-gray-50 rounded-lg p-2">
          <span className="font-medium">X 범위:</span> {graphRange.xMin} ~ {graphRange.xMax}
        </div>
        <div className="bg-gray-50 rounded-lg p-2">
          <span className="font-medium">Y 범위:</span> {graphRange.yMin} ~ {graphRange.yMax}
        </div>
      </div>
    </div>
  )
}

export default GraphVisualization