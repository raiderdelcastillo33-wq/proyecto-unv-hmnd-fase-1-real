import { NextRequest, NextResponse } from 'next/server'
import { CourseService } from '../../../../../lib/services/CourseService'
import { failure } from '../../../../../lib/shared/types/ApiResponse'

const courseService = new CourseService()

export async function GET(request: NextRequest) {
  try {
    const catalog = await courseService.listCatalog()
    return NextResponse.json({ success: true, data: catalog })
  } catch (error) {
    return NextResponse.json(failure(error), { status: 500 })
  }
}