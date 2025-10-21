# Design Guidelines: Curso de Redação Diego Pereira - Portal do Aluno

## Design Approach
**System-Based Approach** inspired by modern educational dashboards (Canvas, Moodle) combined with data-rich productivity tools (Linear, Notion), heavily customized with the brand's golden identity.

**Key Design Principles:**
1. Clarity First: Data visualization should be immediately understandable
2. Performance Focus: Quick access to grades and progress metrics
3. Professional Identity: Reflect the seriousness of ENEM preparation
4. Motivational Design: Celebrate achievements and progress visually

---

## Core Design Elements

### A. Color Palette

**Brand Colors:**
- **Primary Gold:** 45 35% 65% (from DP logo - main accent, CTAs, highlights)
- **Deep Gold:** 45 40% 45% (hover states, active elements)
- **Rich Navy:** 220 30% 15% (primary dark background)
- **Slate Gray:** 220 15% 25% (card backgrounds, secondary surfaces)

**Functional Colors:**
- **Success Green:** 142 76% 45% (competency scores 160-200)
- **Warning Amber:** 38 92% 50% (competency scores 120-159)
- **Alert Red:** 0 72% 51% (competency scores below 120)
- **Info Blue:** 210 90% 60% (neutral information)

**Neutrals:**
- Text Primary: 0 0% 95%
- Text Secondary: 0 0% 70%
- Border: 220 15% 30%
- Subtle: 220 10% 20%

### B. Typography

**Font Families:**
- **Headers:** 'Inter' (600-700 weight) - Clean, modern, professional
- **Body:** 'Inter' (400-500 weight) - Excellent readability
- **Data/Metrics:** 'JetBrains Mono' (500 weight) - Tabular numbers, grades

**Scale:**
- H1: text-4xl font-bold (Dashboard titles)
- H2: text-2xl font-semibold (Section headers)
- H3: text-xl font-semibold (Card titles)
- Body: text-base (General content)
- Small: text-sm (Secondary info, dates)
- Metrics: text-3xl font-mono (Grade displays)

### C. Layout System

**Spacing Primitives:** Use Tailwind units of **4, 6, 8, 12, 16** consistently (p-4, m-6, gap-8, etc.)

**Grid Structure:**
- Dashboard: 12-column grid with sidebar
- Sidebar: 256px fixed width (w-64)
- Main Content: Remaining space with max-w-7xl container
- Cards: Consistent p-6 padding, rounded-lg borders

**Responsive Breakpoints:**
- Mobile (< 768px): Single column, collapsible sidebar
- Tablet (768px-1024px): 2-column grid for cards
- Desktop (> 1024px): Full 3-4 column layouts

### D. Component Library

#### Navigation
- **Sidebar Navigation:** Fixed left sidebar with logo at top, navigation items with icons, active state using golden accent
- **Top Bar:** User profile, notifications, quick actions
- **Active States:** Golden left border (border-l-4) + golden text color

#### Dashboard Cards
- **Base Style:** Dark slate background (Slate Gray), rounded-lg, border subtle
- **Headers:** Golden accent line (border-t-2) or golden icon
- **Elevation:** Subtle shadow on hover (hover:shadow-lg)

**Card Types:**
1. **Metric Cards:** Large number display with label and trend indicator
2. **Chart Cards:** Full-width chart with legend and filters
3. **List Cards:** Recent essays with dates, scores, status badges
4. **Competency Breakdown:** 5 mini-cards (C1-C5) with circular progress indicators

#### Data Visualization
- **Line Charts:** Golden primary line, gray grid, tooltip on hover
- **Bar Charts:** Golden bars for current student, gray bars for class average
- **Progress Circles:** Golden stroke for score, gray background ring
- **Score Badges:** Pill-shaped with color-coded backgrounds (green/amber/red based on performance)

#### Forms & Scheduling
- **Date Picker:** Calendar grid with available slots in golden, booked in gray
- **Time Slots:** Button-style slots, golden for selected, outline for available
- **Input Fields:** Dark background with golden focus ring, clear labels above

#### Buttons & CTAs
- **Primary:** Golden background, white text, slight shadow
- **Secondary:** Outline golden, transparent background
- **Ghost:** Text-only golden on hover
- **Disabled:** Muted gray, reduced opacity

#### Tables
- **Header Row:** Subtle golden bottom border, semibold text
- **Data Rows:** Zebra striping (alternating subtle backgrounds), hover highlight
- **Columns:** Grade, Date, Essay Topic, Competency Scores (C1-C5), Actions

---

## Page-Specific Guidelines

### Dashboard Principal
**Layout Sections (top to bottom):**
1. **Welcome Header:** Student name, current streak, motivational message
2. **Key Metrics Row:** 4 metric cards (Média Geral, Total de Redações, Última Nota, Meta ENEM)
3. **Evolution Chart:** Full-width card with line graph showing grade progression over time
4. **Two-Column Layout:**
   - Left: Últimas Redações (list card with 5 most recent)
   - Right: Competências ENEM (5 circular progress indicators for C1-C5)

### Tela de Agendamento
**Layout:**
1. **Calendar View:** Month calendar on left (60% width)
2. **Available Slots:** List on right (40% width) showing times for selected date
3. **Booking Confirmation:** Modal with selected date/time and confirmation button
4. **My Reservations:** Table below calendar showing upcoming and past reservations

---

## Unique Visual Elements

**Logo Integration:**
- Header: DP logo (60px height) with "Curso de Redação Diego Pereira" text beside it
- Favicon: DP icon only
- Loading States: Animated DP logo with golden pulse

**Competency Labels:**
- C1: "Norma Culta"
- C2: "Tema"
- C3: "Argumentação"
- C4: "Coesão"
- C5: "Proposta"

**Empty States:**
- Illustration style: Simple line drawings in golden color
- Messages: Encouraging, educational tone

**Animations:**
- Subtle entrance: Cards fade up on load (100ms stagger)
- Chart draws: Line animates from left to right on mount
- NO excessive animations - keep interface snappy

---

## Accessibility & Polish

- **Contrast Ratios:** All text meets WCAG AA standards against dark backgrounds
- **Focus States:** Clear golden ring on all interactive elements
- **Keyboard Navigation:** Full support with visible focus indicators
- **Loading States:** Skeleton screens in card shapes with subtle shimmer
- **Error States:** Red accent with clear icon and message
- **Success States:** Green accent with checkmark icon

---

## Images

**Profile/Avatar:**
- Student profile photo (circular, 40px in header, 120px in profile view)
- Default: Initials on golden gradient background

**Empty State Illustrations:**
- Dashboard with no essays: Open book illustration
- No scheduled sessions: Calendar illustration
- All in golden monochrome style, simple line art

**NO large hero image** - This is a utility dashboard focused on data and functionality.