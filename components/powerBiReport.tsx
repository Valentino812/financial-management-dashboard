'use client'

import React from 'react'
import { PowerBIEmbed } from 'powerbi-client-react'
import { models } from 'powerbi-client'

interface PowerBIReportProps {
  reportId: string
  embedUrl: string
  accessToken: string // Token ini didapat dari API Backend (akan dijelaskan di bawah)
}

export default function PowerBIReport({ reportId, embedUrl, accessToken }: PowerBIReportProps) {
  return (
    <div className="h-[600px] w-full border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      <PowerBIEmbed
        embedConfig={{
          type: 'report',   // Bisa 'report', 'dashboard', atau 'tile'
          id: reportId,
          embedUrl: embedUrl,
          accessToken: accessToken,
          tokenType: models.TokenType.Embed, // Gunakan Embed untuk 'App owns data', atau Aad untuk 'User owns data'
          settings: {
            panes: {
              filters: {
                expanded: false,
                visible: true
              }
            },
            background: models.BackgroundType.Transparent,
          }
        }}

        eventHandlers={
          new Map([
            ['loaded', function () { console.log('Report loaded'); }],
            ['rendered', function () { console.log('Report rendered'); }],
            ['error', function (event) { console.log(event?.detail); }]
          ])
        }

        cssClassName={"h-full w-full"} // Class CSS untuk container iframe
        getEmbeddedComponent={(embeddedReport) => {
          // Anda bisa menyimpan referensi report ini di state jika ingin berinteraksi nanti
          // contoh: window.report = embeddedReport;
        }}
      />
    </div>
  )
}