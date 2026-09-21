import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Palette, Check, X } from 'lucide-react'
import { useTheme, themes, type ThemeId } from '../context/ThemeContext'

export default function ThemeSwitcher() {
  const { currentTheme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Floating Theme Switcher Badge */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-charcoal text-warm-white shadow-2xl border border-white/20 hover:scale-105 active:scale-95 transition-all group"
        aria-label="Toggle Theme Switcher"
      >
        <Palette size={16} className="text-amber-300 group-hover:rotate-45 transition-transform duration-300" />
        <span className="text-[11px] font-sans font-semibold tracking-widest uppercase">
          THEME: <span className="text-amber-200">{themes.find(t => t.id === currentTheme)?.name.split(' ')[0]}</span>
        </span>
      </motion.button>

      {/* Modal / Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="fixed bottom-20 left-6 z-50 w-[calc(100vw-3rem)] max-w-sm rounded-3xl bg-warm-white border border-silver/40 p-6 shadow-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between mb-5 pb-3 border-b border-silver/30">
                <div className="flex items-center gap-2">
                  <Palette size={18} className="text-charcoal" />
                  <h3 className="font-serif text-lg font-light text-charcoal">Design Themes</h3>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-full hover:bg-silver/30 text-charcoal-mid transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <p className="text-xs font-sans font-light text-charcoal-mid mb-4">
                Explore 5 bespoke aesthetics designed for Pasith CDT:
              </p>

              <div className="space-y-3">
                {themes.map((t) => {
                  const isSelected = currentTheme === t.id
                  return (
                    <button
                      key={t.id}
                      onClick={() => {
                        setTheme(t.id)
                        setIsOpen(false)
                      }}
                      className={`w-full flex items-center justify-between p-3.5 rounded-2xl border text-left transition-all ${
                        isSelected
                          ? 'bg-charcoal text-warm-white border-charcoal shadow-md'
                          : 'bg-warm-offwhite text-charcoal border-silver/30 hover:border-charcoal/40'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="w-4 h-4 rounded-full border border-white/40 shadow-inner flex-shrink-0"
                          style={{ backgroundColor: t.accentColor }}
                        />
                        <div>
                          <p className="text-xs font-sans font-semibold tracking-wide uppercase">
                            {t.name}
                          </p>
                          <p className={`text-[10px] font-sans font-light ${isSelected ? 'text-silver' : 'text-charcoal-mid'}`}>
                            {t.subtitle}
                          </p>
                        </div>
                      </div>

                      {isSelected && <Check size={16} className="text-amber-300 flex-shrink-0" />}
                    </button>
                  )
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
