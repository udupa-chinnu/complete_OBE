"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function TextbooksReferencesPage() {
  const router = useRouter()
  const [showCompletionDialog, setShowCompletionDialog] = useState(false)

  // Text Books State
  const [textBooks, setTextBooks] = useState([
    { id: 1, bookName: "IAN", author: "SE", publisher: "Prateek", version: "1.5" },
  ])
  const [textBookForm, setTextBookForm] = useState({
    bookName: "",
    author: "",
    publisher: "",
    version: "",
  })

  // Reference Books State
  const [referenceBooks, setReferenceBooks] = useState([
    { id: 1, bookName: "SE", author: "Naveen", publisher: "Peterson", version: "2.5" },
  ])
  const [referenceBookForm, setReferenceBookForm] = useState({
    bookName: "",
    author: "",
    publisher: "",
    version: "",
  })

  // Checkbox States
  const [showJournal, setShowJournal] = useState(false)
  const [showHandbook, setShowHandbook] = useState(false)
  const [showWebpage, setShowWebpage] = useState(false)

  // Journal State
  const [journals, setJournals] = useState([
    { id: 1, journalName: "Springer", volumeNumber: "Vol-11", pageNumbers: "22-23" },
  ])
  const [journalForm, setJournalForm] = useState({
    journalName: "",
    volumeNumber: "",
    pageNumbers: "",
  })

  // Handbook State
  const [handbooks, setHandbooks] = useState([
    { id: 1, handbookName: "Raju", author: "Kumar", publisher: "Nav" },
  ])
  const [handbookForm, setHandbookForm] = useState({
    handbookName: "",
    author: "",
    publisher: "",
  })

  // Webpage State
  const [webpages, setWebpages] = useState([{ id: 1, webpageName: "WHO", url: "www.who.com" }])
  const [webpageForm, setWebpageForm] = useState({
    webpageName: "",
    url: "",
  })

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isLoggedIn) {
      router.push("/")
    }
  }, [router])

  const handleBack = () => {
    router.push("/course-workflow/curriculum-gap-analysis")
  }

  // Text Books Functions
  const handleAddTextBook = (e: React.FormEvent) => {
    e.preventDefault()
    if (textBookForm.bookName && textBookForm.author && textBookForm.publisher && textBookForm.version) {
      const newBook = {
        id: textBooks.length + 1,
        ...textBookForm,
      }
      setTextBooks([...textBooks, newBook])
      setTextBookForm({ bookName: "", author: "", publisher: "", version: "" })
    }
  }

  const handleDeleteTextBook = (id: number) => {
    setTextBooks(textBooks.filter((book) => book.id !== id))
  }

  // Reference Books Functions
  const handleAddReferenceBook = (e: React.FormEvent) => {
    e.preventDefault()
    if (referenceBookForm.bookName && referenceBookForm.author && referenceBookForm.publisher && referenceBookForm.version) {
      const newBook = {
        id: referenceBooks.length + 1,
        ...referenceBookForm,
      }
      setReferenceBooks([...referenceBooks, newBook])
      setReferenceBookForm({ bookName: "", author: "", publisher: "", version: "" })
    }
  }

  const handleDeleteReferenceBook = (id: number) => {
    setReferenceBooks(referenceBooks.filter((book) => book.id !== id))
  }

  // Journal Functions
  const handleAddJournal = (e: React.FormEvent) => {
    e.preventDefault()
    if (journalForm.journalName && journalForm.volumeNumber && journalForm.pageNumbers) {
      const newJournal = {
        id: journals.length + 1,
        ...journalForm,
      }
      setJournals([...journals, newJournal])
      setJournalForm({ journalName: "", volumeNumber: "", pageNumbers: "" })
    }
  }

  const handleDeleteJournal = (id: number) => {
    setJournals(journals.filter((journal) => journal.id !== id))
  }

  // Handbook Functions
  const handleAddHandbook = (e: React.FormEvent) => {
    e.preventDefault()
    if (handbookForm.handbookName && handbookForm.author && handbookForm.publisher) {
      const newHandbook = {
        id: handbooks.length + 1,
        ...handbookForm,
      }
      setHandbooks([...handbooks, newHandbook])
      setHandbookForm({ handbookName: "", author: "", publisher: "" })
    }
  }

  const handleDeleteHandbook = (id: number) => {
    setHandbooks(handbooks.filter((handbook) => handbook.id !== id))
  }

  // Webpage Functions
  const handleAddWebpage = (e: React.FormEvent) => {
    e.preventDefault()
    if (webpageForm.webpageName && webpageForm.url) {
      const newWebpage = {
        id: webpages.length + 1,
        ...webpageForm,
      }
      setWebpages([...webpages, newWebpage])
      setWebpageForm({ webpageName: "", url: "" })
    }
  }

  const handleDeleteWebpage = (id: number) => {
    setWebpages(webpages.filter((webpage) => webpage.id !== id))
  }

  const handleSubmit = () => {
    setShowCompletionDialog(true)
  }

  const handleCompletionOk = () => {
    setShowCompletionDialog(false)
    router.push("/academic")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <span className="text-lg font-semibold text-gray-800">Digital Campus</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span>🏠</span>
                <span>📧</span>
                <span>🔔</span>
                <span className="font-medium">RITHESH PAKKALA P</span>
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">RP</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Button onClick={handleBack} variant="outline" size="sm">
            ← Back
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-blue-600">Text Books & Reference Materials</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Text Books Section */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">Text Books</h3>
              
              <form onSubmit={handleAddTextBook} className="grid grid-cols-5 gap-4 items-end">
                <Input
                  placeholder="Name of the Book"
                  value={textBookForm.bookName}
                  onChange={(e) => setTextBookForm({ ...textBookForm, bookName: e.target.value })}
                />
                <Input
                  placeholder="Author"
                  value={textBookForm.author}
                  onChange={(e) => setTextBookForm({ ...textBookForm, author: e.target.value })}
                />
                <Input
                  placeholder="Publisher"
                  value={textBookForm.publisher}
                  onChange={(e) => setTextBookForm({ ...textBookForm, publisher: e.target.value })}
                />
                <Input
                  placeholder="Version"
                  value={textBookForm.version}
                  onChange={(e) => setTextBookForm({ ...textBookForm, version: e.target.value })}
                />
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  Add
                </Button>
              </form>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-300 px-4 py-3 text-left">#</th>
                      <th className="border border-gray-300 px-4 py-3 text-left">Book Name</th>
                      <th className="border border-gray-300 px-4 py-3 text-left">Author</th>
                      <th className="border border-gray-300 px-4 py-3 text-left">Publisher</th>
                      <th className="border border-gray-300 px-4 py-3 text-left">Version</th>
                      <th className="border border-gray-300 px-4 py-3 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {textBooks.map((book, index) => (
                      <tr key={book.id} className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-4 py-3">{index + 1}</td>
                        <td className="border border-gray-300 px-4 py-3">{book.bookName}</td>
                        <td className="border border-gray-300 px-4 py-3">{book.author}</td>
                        <td className="border border-gray-300 px-4 py-3">{book.publisher}</td>
                        <td className="border border-gray-300 px-4 py-3">{book.version}</td>
                        <td className="border border-gray-300 px-4 py-3">
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline" className="bg-yellow-500 hover:bg-yellow-600 text-white">
                              Edit
                            </Button>
                            <Button
                              onClick={() => handleDeleteTextBook(book.id)}
                              size="sm"
                              variant="outline"
                              className="bg-red-500 hover:bg-red-600 text-white"
                            >
                              Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Reference Books Section */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">Reference Books</h3>
              
              <form onSubmit={handleAddReferenceBook} className="grid grid-cols-5 gap-4 items-end">
                <Input
                  placeholder="Name of the Book"
                  value={referenceBookForm.bookName}
                  onChange={(e) => setReferenceBookForm({ ...referenceBookForm, bookName: e.target.value })}
                />
                <Input
                  placeholder="Author"
                  value={referenceBookForm.author}
                  onChange={(e) => setReferenceBookForm({ ...referenceBookForm, author: e.target.value })}
                />
                <Input
                  placeholder="Publisher"
                  value={referenceBookForm.publisher}
                  onChange={(e) => setReferenceBookForm({ ...referenceBookForm, publisher: e.target.value })}
                />
                <Input
                  placeholder="Version"
                  value={referenceBookForm.version}
                  onChange={(e) => setReferenceBookForm({ ...referenceBookForm, version: e.target.value })}
                />
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  Add
                </Button>
              </form>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-300 px-4 py-3 text-left">#</th>
                      <th className="border border-gray-300 px-4 py-3 text-left">Book Name</th>
                      <th className="border border-gray-300 px-4 py-3 text-left">Author</th>
                      <th className="border border-gray-300 px-4 py-3 text-left">Publisher</th>
                      <th className="border border-gray-300 px-4 py-3 text-left">Version</th>
                      <th className="border border-gray-300 px-4 py-3 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {referenceBooks.map((book, index) => (
                      <tr key={book.id} className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-4 py-3">{index + 1}</td>
                        <td className="border border-gray-300 px-4 py-3">{book.bookName}</td>
                        <td className="border border-gray-300 px-4 py-3">{book.author}</td>
                        <td className="border border-gray-300 px-4 py-3">{book.publisher}</td>
                        <td className="border border-gray-300 px-4 py-3">{book.version}</td>
                        <td className="border border-gray-300 px-4 py-3">
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline" className="bg-yellow-500 hover:bg-yellow-600 text-white">
                              Edit
                            </Button>
                            <Button
                              onClick={() => handleDeleteReferenceBook(book.id)}
                              size="sm"
                              variant="outline"
                              className="bg-red-500 hover:bg-red-600 text-white"
                            >
                              Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Toggle Checkboxes */}
            <div className="space-y-4">
              <div className="flex space-x-6">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="journal"
                    checked={showJournal}
                    onCheckedChange={(checked) => setShowJournal(checked as boolean)}
                  />
                  <label htmlFor="journal" className="font-medium">
                    Journal
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="handbook"
                    checked={showHandbook}
                    onCheckedChange={(checked) => setShowHandbook(checked as boolean)}
                  />
                  <label htmlFor="handbook" className="font-medium">
                    Handbooks
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="webpage"
                    checked={showWebpage}
                    onCheckedChange={(checked) => setShowWebpage(checked as boolean)}
                  />
                  <label htmlFor="webpage" className="font-medium">
                    Webpage
                  </label>
                </div>
              </div>
            </div>

            {/* Journal Section */}
            {showJournal && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800">Journal</h3>
                
                <form onSubmit={handleAddJournal} className="grid grid-cols-4 gap-4 items-end">
                  <Input
                    placeholder="Name of the Journal"
                    value={journalForm.journalName}
                    onChange={(e) => setJournalForm({ ...journalForm, journalName: e.target.value })}
                  />
                  <Input
                    placeholder="Volume Number"
                    value={journalForm.volumeNumber}
                    onChange={(e) => setJournalForm({ ...journalForm, volumeNumber: e.target.value })}
                  />
                  <Input
                    placeholder="Page Numbers"
                    value={journalForm.pageNumbers}
                    onChange={(e) => setJournalForm({ ...journalForm, pageNumbers: e.target.value })}
                  />
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                    Add
                  </Button>
                </form>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-300 px-4 py-3 text-left">#</th>
                        <th className="border border-gray-300 px-4 py-3 text-left">Journal Name</th>
                        <th className="border border-gray-300 px-4 py-3 text-left">Volume Number</th>
                        <th className="border border-gray-300 px-4 py-3 text-left">Page Numbers</th>
                        <th className="border border-gray-300 px-4 py-3 text-left">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {journals.map((journal, index) => (
                        <tr key={journal.id} className="hover:bg-gray-50">
                          <td className="border border-gray-300 px-4 py-3">{index + 1}</td>
                          <td className="border border-gray-300 px-4 py-3">{journal.journalName}</td>
                          <td className="border border-gray-300 px-4 py-3">{journal.volumeNumber}</td>
                          <td className="border border-gray-300 px-4 py-3">{journal.pageNumbers}</td>
                          <td className="border border-gray-300 px-4 py-3">
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline" className="bg-yellow-500 hover:bg-yellow-600 text-white">
                                Edit
                              </Button>
                              <Button
                                onClick={() => handleDeleteJournal(journal.id)}
                                size="sm"
                                variant="outline"
                                className="bg-red-500 hover:bg-red-600 text-white"
                              >
                                Delete
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Handbook Section */}
            {showHandbook && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800">Handbook</h3>
                
                <form onSubmit={handleAddHandbook} className="grid grid-cols-4 gap-4 items-end">
                  <Input
                    placeholder="Handbook Name"
                    value={handbookForm.handbookName}
                    onChange={(e) => setHandbookForm({ ...handbookForm, handbookName: e.target.value })}
                  />
                  <Input
                    placeholder="Author"
                    value={handbookForm.author}
                    onChange={(e) => setHandbookForm({ ...handbookForm, author: e.target.value })}
                  />
                  <Input
                    placeholder="Publisher"
                    value={handbookForm.publisher}
                    onChange={(e) => setHandbookForm({ ...handbookForm, publisher: e.target.value })}
                  />
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                    Add
                  </Button>
                </form>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-300 px-4 py-3 text-left">#</th>
                        <th className="border border-gray-300 px-4 py-3 text-left">Handbook Name</th>
                        <th className="border border-gray-300 px-4 py-3 text-left">Author</th>
                        <th className="border border-gray-300 px-4 py-3 text-left">Publisher</th>
                        <th className="border border-gray-300 px-4 py-3 text-left">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {handbooks.map((handbook, index) => (
                        <tr key={handbook.id} className="hover:bg-gray-50">
                          <td className="border border-gray-300 px-4 py-3">{index + 1}</td>
                          <td className="border border-gray-300 px-4 py-3">{handbook.handbookName}</td>
                          <td className="border border-gray-300 px-4 py-3">{handbook.author}</td>
                          <td className="border border-gray-300 px-4 py-3">{handbook.publisher}</td>
                          <td className="border border-gray-300 px-4 py-3">
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline" className="bg-yellow-500 hover:bg-yellow-600 text-white">
                                Edit
                              </Button>
                              <Button
                                onClick={() => handleDeleteHandbook(handbook.id)}
                                size="sm"
                                variant="outline"
                                className="bg-red-500 hover:bg-red-600 text-white"
                              >
                                Delete
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Webpage Section */}
            {showWebpage && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800">Web Page</h3>
                
                <form onSubmit={handleAddWebpage} className="grid grid-cols-3 gap-4 items-end">
                  <Input
                    placeholder="Webpage Name"
                    value={webpageForm.webpageName}
                    onChange={(e) => setWebpageForm({ ...webpageForm, webpageName: e.target.value })}
                  />
                  <Input
                    placeholder="URL of the Webpage"
                    value={webpageForm.url}
                    onChange={(e) => setWebpageForm({ ...webpageForm, url: e.target.value })}
                  />
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                    Add
                  </Button>
                </form>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-300 px-4 py-3 text-left">#</th>
                        <th className="border border-gray-300 px-4 py-3 text-left">Webpage Name</th>
                        <th className="border border-gray-300 px-4 py-3 text-left">URL</th>
                        <th className="border border-gray-300 px-4 py-3 text-left">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {webpages.map((webpage, index) => (
                        <tr key={webpage.id} className="hover:bg-gray-50">
                          <td className="border border-gray-300 px-4 py-3">{index + 1}</td>
                          <td className="border border-gray-300 px-4 py-3">{webpage.webpageName}</td>
                          <td className="border border-gray-300 px-4 py-3">{webpage.url}</td>
                          <td className="border border-gray-300 px-4 py-3">
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline" className="bg-yellow-500 hover:bg-yellow-600 text-white">
                                Edit
                              </Button>
                              <Button
                                onClick={() => handleDeleteWebpage(webpage.id)}
                                size="sm"
                                variant="outline"
                                className="bg-red-500 hover:bg-red-600 text-white"
                              >
                                Delete
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-center pt-6">
              <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700 px-8 py-3 text-lg">
                Submit
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Completion Dialog */}
        <Dialog open={showCompletionDialog} onOpenChange={setShowCompletionDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center text-green-600">Course File Workflow Completed!</DialogTitle>
              <DialogDescription className="text-center">
                Your course file has been successfully created and submitted. All sections have been completed.
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-center mt-4">
              <Button onClick={handleCompletionOk} className="bg-green-600 hover:bg-green-700">
                OK
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
